/**
 * Converts a timestamp to relative time format (e.g., "2 hours ago", "3 days ago").
 * Supports both Date objects and ISO string inputs.
 * 
 * @param {Date | string} date - The timestamp to format (Date object or ISO string)
 * @returns {string} Relative time string (e.g., "2 hours ago", "3 days ago", "2 weeks ago")
 * 
 * @example
 * formatRelativeTime(new Date()) // Returns "just now"
 * formatRelativeTime("2024-01-15T10:00:00Z") // Returns relative time from that date
 */
export function formatRelativeTime(date) {
  // Convert string to Date if needed
  const timestamp = date instanceof Date ? date : new Date(date);
  
  // Validate the date
  if (isNaN(timestamp.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const now = new Date();
  const diffInMs = now - timestamp;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  
  // Handle future dates
  if (diffInMs < 0) {
    return 'just now';
  }
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  }
  
  // Less than a day
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }
  
  // Less than a week
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }
  
  // Less than a month (4 weeks)
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  }
  
  // More than a month - return formatted date
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return timestamp.toLocaleDateString('en-US', options);
}
