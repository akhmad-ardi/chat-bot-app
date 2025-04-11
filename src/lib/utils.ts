import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { loadEnvConfig } from "@next/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function loadEnv() {
  // const projectDir = process.cwd();
  // loadEnvConfig(projectDir);
}
