/**
 * Utility function to merge classNames conditionally
 * Combines clsx-like functionality for conditional className merging
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
