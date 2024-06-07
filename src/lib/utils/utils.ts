// utils, helpers, stuff that doesn't fit anywhere else

import type { DtwType } from "@transcribe/transcriber";

export function generateRandomId(name: string): string {
  return `${name}-${(Math.random() * 10e15).toString(16)}`;
}

export function getSystemPreferedColorScheme(): "auto" | "light" | "dark" {
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "auto";
}

export function getDtwTypeFromFilename(filename: string): DtwType | undefined {
  const matchers: DtwType[] = [
    "tiny.en",
    "base.en",
    "small.en",
    "tiny",
    "base",
    "small",
  ];

  return matchers.find((matcher) => filename.includes(matcher));
}

export async function asyncEvery(
  array: any[],
  predicate: (value: any, index: number, array: any[]) => Promise<boolean>,
): Promise<boolean> {
  for (let index = 0; index < array.length; index++) {
    if (!(await predicate(array[index], index, array))) {
      return false;
    }
  }

  return true;
}
