import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY;

const ENV_PREFIX = process.env.NODE_ENV === "production" ? "prod_" : "dev_";

export const TABLE_NAMES = {
  HEALTH_CHECK_PING: `${ENV_PREFIX}health_check_ping`,
} as const;

export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];
