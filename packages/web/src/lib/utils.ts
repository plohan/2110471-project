import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timestampString(d: Date): string {
  const now = new Date();
  const diff = now.getDate() - d.getDate();
  if (diff < 24 * 60 * 60 * 1000) {
    return `${d.getHours()}:${d.getMinutes()}`;
  } else {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
}

const adverbs = [
  "bravely",
  "courageously",
  "daringly",
  "eagerly",
  "fearlessly",
  "gently",
  "happily",
  "impatiently",
  "jubilantly",
  "kindly",
  "lazily",
  "merrily",
  "nervously",
  "optimistically",
  "playfully",
  "quietly",
  "rapidly",
  "seriously",
  "thoughtfully",
  "vigorously",
  "warmly",
  "zealously",
];

const adjectives = [
  "adorable",
  "amazing",
  "beautiful",
  "charming",
  "clever",
  "delightful",
  "elegant",
  "fantastic",
  "gentle",
  "happy",
  "innocent",
  "joyful",
  "kind",
  "lovely",
  "magnificent",
  "noble",
  "optimistic",
  "playful",
  "quiet",
  "radiant",
  "sincere",
  "thrilling",
  "vibrant",
  "wonderful",
];

const commonNouns = [
  "apple",
  "banana",
  "carrot",
  "dog",
  "elephant",
  "flower",
  "guitar",
  "house",
  "ice cream",
  "jacket",
  "kite",
  "lion",
  "moon",
  "notebook",
  "ocean",
  "piano",
  "queen",
  "rainbow",
  "sun",
  "tree",
  "umbrella",
  "violin",
  "waterfall",
  "xylophone",
  "zebra",
];
