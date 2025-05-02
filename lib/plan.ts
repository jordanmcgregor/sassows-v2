import { type Plan } from "@/types/modules/type"
export const PLAN_LEVELS: Plan[] = ['free', 'basic', 'premium'];

export type PlanName = typeof PLAN_LEVELS[number];

export function isModuleLocked(userPlan: string, requiredPlan: string): boolean {
  const userIndex = PLAN_LEVELS.indexOf(userPlan as PlanName);
  const requiredIndex = PLAN_LEVELS.indexOf(requiredPlan as PlanName);
  if (userIndex === -1 || requiredIndex === -1) return false; // or true to lock invalid ones
  return userIndex < requiredIndex;
}

export function isFeatureLocked(userPlan: string, requiredPlan: Plan): boolean {
  const userIndex = PLAN_LEVELS.indexOf(userPlan as PlanName);
  const requiredIndex = PLAN_LEVELS.indexOf(requiredPlan as PlanName);
  if (userIndex === -1 || requiredIndex === -1) return false; // or true to lock invalid ones
  return userIndex < requiredIndex;
}

export const filesPlan: Plan = 'premium'

