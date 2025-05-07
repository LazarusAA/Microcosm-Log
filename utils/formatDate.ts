/**
 * Format a date string into a human-readable format
 * @param dateString ISO date string
 * @param includeTime Whether to include the time in the formatted date
 * @returns Formatted date string
 */
export function formatDate(dateString: string, includeTime: boolean = false): string {
  const date = new Date(dateString)
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  
  if (includeTime) {
    options.hour = 'numeric'
    options.minute = 'numeric'
  }
  
  return date.toLocaleDateString('en-US', options)
} 