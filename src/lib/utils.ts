import type { ThemeColor } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getThemeColorByIndex(idx: number, offset: number = 0): ThemeColor {
  const colors: ThemeColor[] = ["bg-primary", "bg-secondary", "bg-accent"];
  return colors[(idx + offset) % 3];
}
