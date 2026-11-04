import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

/**
 * Merge Tailwind class names safely (clsx + tailwind-merge).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO date string to a human-readable date.
 * Example: "Nov 5, 2026"
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return dateString;
  return format(date, 'MMM d, yyyy');
}

/**
 * Format an ISO date string to date + time.
 * Example: "Nov 5, 2026 at 2:30 PM"
 */
export function formatDateTime(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return dateString;
  return format(date, "MMM d, yyyy 'at' h:mm a");
}

/**
 * Returns a relative time string.
 * Example: "3 minutes ago"
 */
export function timeAgo(dateString: string): string {
  const date = parseISO(dateString);
  if (!isValid(date)) return dateString;
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert a snake_case or SCREAMING_SNAKE_CASE string to Title Case.
 * Example: "IN_TRANSIT" → "In Transit"
 */
export function snakeToTitle(str: string): string {
  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
}

/**
 * Generate initials from a full name.
 * Example: "John Smith" → "JS"
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0].toUpperCase())
    .join('');
}

/**
 * Truncate a string to a maximum length.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Format a load/truck/driver reference ID for display.
 * Uses JetBrains Mono in the UI — this just formats the string.
 */
export function formatRefId(id: string): string {
  return id.toUpperCase();
}

/**
 * Delay helper for mock async operations.
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
