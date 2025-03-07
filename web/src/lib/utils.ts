import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateZipcode(code: string): {
  isValid: boolean;
  message: string;
} {
  // Check if input contains only numbers and hyphens
  if (!/^[0-9-]+$/.test(code)) {
    return {
      isValid: false,
      message:
        "郵便番号は半角数字のみまたは半角数字とハイフンのみで入力してください。",
    };
  }

  // Check if format is either 000-0000 or 0000000
  const cleanCode = code.replace(/-/g, "");
  if (cleanCode.length !== 7 || (code.includes("-") && code.length !== 8)) {
    return {
      isValid: false,
      message:
        "郵便番号は半角数字でハイフンありの8桁かハイフンなしの7桁で入力してください。",
    };
  }

  return { isValid: true, message: "" };
}
