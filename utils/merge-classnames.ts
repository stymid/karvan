import { clsx } from "clsx";

export function mergeClassNames<T extends Record<string, any>>(
  base?: T,
  extra?: T
): T | undefined {
  if (!base && !extra) return undefined;

  const result: Record<string, any> = { ...base };

  for (const key in extra) {
    result[key] = clsx(base?.[key], extra[key]);
  }

  return result as T;
}
