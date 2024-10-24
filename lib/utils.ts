import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export async function calculateAudienceSize(rules: any[], operator: 'AND' | 'OR'): Promise<any> {
  // Implement audience size calculation logic here
  return { reach: 1000000, percentage: 50, historical: 900000, conversionRate: 2.5 };
}

export async function fetchLocationSuggestions(query: string): Promise<string[]> {
  // Implement location suggestion fetching logic here
  return ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'].filter(city => city.toLowerCase().includes(query.toLowerCase()));
}

export async function fetchAudienceSegments(): Promise<string[]> {
  // Implement audience segment fetching logic here
  return ['New Visitors', 'Returning Customers', 'High-Value Customers', 'Cart Abandoners'];
}

export function validateCustomRule(value: any, type: string): boolean {
  // Implement custom rule validation logic here
  return true;
}