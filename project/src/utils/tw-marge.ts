import clsx, { type ClassValue } from 'clsx';
import { twMerge as _twMerge } from 'tailwind-merge';

export default function twMerge(...inputs: ClassValue[]) {
  return _twMerge(clsx(...inputs));
}

export const tm = twMerge;
