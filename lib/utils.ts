// Utility helper to cleanly and conditionally combine class names in Tailwind + React


import { clsx, type ClassValue } from "clsx" //clsx, a utility for conditionally joining classNames together
import { twMerge } from "tailwind-merge" // twMerge, a utility to merge Tailwind CSS class names intelligently

// This function combines clsx and twMerge to create a utility for combining class names
//cn - A helper function to combine multiple class name values into a single string, 
// handling conditional classes and resolving Tailwind CSS class conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
