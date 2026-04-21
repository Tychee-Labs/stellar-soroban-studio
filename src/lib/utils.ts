import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExternalUrl(url?: string) {
  if (!url) return false;
  return /^https?:\/\//i.test(url) || url.startsWith("//");
}
