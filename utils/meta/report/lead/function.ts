// utils/reportMetaLead.ts
"use client";
import { createClient } from "@/utils/supabase/client";
import { sendSlackMessageViaApi } from "@/app/actions/slack/send-message";
import * as pixel from "@/components/lib/mpixel";

const waitForFbq = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const maxAttempts = 20;
    let attempts = 0;

    const check = () => {
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        resolve();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(check, 250);
      } else {
        reject(new Error("window.fbq not initialized"));
      }
    };

    check();
  });
};

// Utility to get the current user (if logged in)
async function getUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    await sendSlackMessageViaApi(
      process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL!,
      `Supabase getUser error: ${JSON.stringify(error)}`
    );
    return null;
  }

  return user;
}

export async function reportMetaLeadFunction() {
  const supabase = createClient();

  // Try to fetch current user (might be null if anon)
  const authUser = await getUser();
  let existingMetaLead: string | null = null;

  if (authUser) {
    const { data: userRow } = await supabase
      .from("users")
      .select("meta_lead")
      .eq("id", authUser.id)
      .single();

    existingMetaLead = userRow?.meta_lead || null;
  }

  // Already tracked? bail
  if (existingMetaLead) return existingMetaLead;

  let eventId = localStorage.getItem("meta_lead_eventId");
  if (eventId) return eventId;

  // Generate unique eventId
  const generateEventId = () =>
    crypto.randomUUID().replace(/-/g, "").slice(0, 20);

  eventId = generateEventId();
  localStorage.setItem("meta_lead_eventId", eventId);

  const eventObject = { eventId };

  // Fire FB pixel event
  try {
    await waitForFbq();
    pixel.event("Lead", {}, eventObject);
  } catch (error) {
    await sendSlackMessageViaApi(
      process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL!,
      `FBQ error: ${String(error)}`
    );
  }

  // Call server-side CAPI
  try {
    await fetch(`/api/meta/capi/lead?eventId=${eventId}`);
  } catch (error) {
    await sendSlackMessageViaApi(
      process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL!,
      `API error: ${String(error)}`
    );
  }

  // Only persist if user exists
  if (authUser) {
    const { error } = await supabase
      .from("users")
      .update({ meta_lead: eventId })
      .eq("id", authUser.id)
      .is("meta_lead", null); // safe update

    if (error) {
      await sendSlackMessageViaApi(
        process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL!,
        `Supabase update error: ${JSON.stringify(error)}`
      );
    }
  }

  return eventId;
}