'use client';

import { createContext, useContext, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import * as pixel from "@/components/lib/mpixel";
import { sendSlackMessageViaApi } from '@/app/actions/slack/send-message';

// 1. Define the shape of your child object
export type Child = {
  id: string;
  name: string;
  // add other fields as needed
};

// 2. Define the context shape
type ChildContextType = {
  selectedChild: Child;
  setSelectedChild: (child: Child) => void;
  allChildren: Child[];
};

// 3. Create the context with a fallback that will error if used outside the provider
const ChildContext = createContext<ChildContextType | undefined>(undefined);


export type User = {
  id: string,
  timezone: string,
  onboarded: boolean | null,
  pwa: boolean | null,
  fcm_token: string,
  meta_lead: string,
  products: { id: string, name: string }[]
  children: Child[]

  // extend with more fields as needed
} | null;

type UserContextType = {
  products: { id: string, name: string }[]
  // extend with more fields as needed
};

// Context for user
// type UserContextType = {
//   user: User;
// };
const UserContext = createContext<User | undefined>(undefined);

// // 4. Provider component
// export function ChildProvider({
//   children,
//   initialChildren,
// }: {
//   children: React.ReactNode;
//   initialChildren: Child[];
// }) {
//   const [selectedChild, setSelectedChild] = useState<Child>(initialChildren[0]);

//   return (
//     <ChildContext.Provider value={{ selectedChild, setSelectedChild, allChildren: initialChildren }}>
//       {children}
//     </ChildContext.Provider>
//   );
// }

// 5. Hook to use the context
export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within an OnboardedProvider');
  }
  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an OnboardedProvider');
  }
  return context;
};


import { useEffect } from 'react';



export function OnboardedProvider({
  children,
  initialChildren,
  user,
}: {
  children: React.ReactNode;
  initialChildren: Child[];
  user: User;
}) {
  const [selectedChild, setSelectedChildState] = useState<Child | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedChild');
    if (stored) {
      setSelectedChildState(JSON.parse(stored));
    } else {
      setSelectedChildState(initialChildren[0]);
    }
  }, [initialChildren]);

  useEffect(() => {
    const setMetaLead = async () => {
      const generateEventId = () => {
        return Array.from({ length: 20 }, () =>
          Math.random().toString(36).charAt(2)
        ).join('');
      };

      const eventObject = { eventId: generateEventId() }
      sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${eventObject.eventId}` as string)
      try {
        pixel.event('Lead', {}, eventObject)
      }
      catch (error) {
        sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${error}` as string)
      }

      const response = fetch(`/api/met/capi/lead?eventId=${eventObject.eventId}`)
      sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${response}` as string)
      const supabase = createClient()
      const { data, error } = await supabase
        .from("users")
        .update({ meta_lead: eventObject.eventId })
        .eq('id', user?.id)
      sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${data}` as string)
      sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `${error}` as string)
    }

    sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `Entered selected-child line 125` as string)
    if (!user?.meta_lead) {
      sendSlackMessageViaApi(process.env.NEXT_PUBLIC_SLACK_ERROR_REPORTING_CHANNEL, `Entered selected-child line 127 ${user?.meta_lead}` as string)
      setMetaLead()
    }
  }, [])

  const setSelectedChild = (child: Child) => {
    localStorage.setItem('selectedChild', JSON.stringify(child));
    setSelectedChildState(child);
  };

  if (!selectedChild) return null; // or a loading spinner

  return (
    <UserContext.Provider value={user}>
      <ChildContext.Provider value={{ selectedChild, setSelectedChild, allChildren: initialChildren }}>
        {children}
      </ChildContext.Provider>
    </UserContext.Provider>
  );
}

