import { formatRelativeTime } from './relativeTime';

describe('formatRelativeTime', () => {
  // Helper to create a date relative to now
  const getRelativeDate = (seconds = 0, minutes = 0, hours = 0, days = 0, weeks = 0) => {
    const now = new Date();
    const ms = (seconds * 1000) + (minutes * 60 * 1000) + (hours * 60 * 60 * 1000) + 
               (days * 24 * 60 * 60 * 1000) + (weeks * 7 * 24 * 60 * 60 * 1000);
    return new Date(now.getTime() - ms);
  };

  describe('Date object input', () => {
    test('returns "just now" for current time', () => {
      const now = new Date();
      expect(formatRelativeTime(now)).toBe('just now');
    });

    test('returns "just now" for time less than 60 seconds ago', () => {
      const date = getRelativeDate(30);
      expect(formatRelativeTime(date)).toBe('just now');
    });

    test('returns "1 minute ago" for 1 minute ago', () => {
      const date = getRelativeDate(0, 1);
      expect(formatRelativeTime(date)).toBe('1 minute ago');
    });

    test('returns "X minutes ago" for multiple minutes', () => {
      const date = getRelativeDate(0, 5);
      expect(formatRelativeTime(date)).toBe('5 minutes ago');
    });

    test('returns "1 hour ago" for 1 hour ago', () => {
      const date = getRelativeDate(0, 0, 1);
      expect(formatRelativeTime(date)).toBe('1 hour ago');
    });

    test('returns "X hours ago" for multiple hours', () => {
      const date = getRelativeDate(0, 0, 3);
      expect(formatRelativeTime(date)).toBe('3 hours ago');
    });

    test('returns "1 day ago" for 1 day ago', () => {
      const date = getRelativeDate(0, 0, 0, 1);
      expect(formatRelativeTime(date)).toBe('1 day ago');
    });

    test('returns "X days ago" for multiple days', () => {
      const date = getRelativeDate(0, 0, 0, 3);
      expect(formatRelativeTime(date)).toBe('3 days ago');
    });

    test('returns "1 week ago" for 1 week ago', () => {
      const date = getRelativeDate(0, 0, 0, 0, 1);
      expect(formatRelativeTime(date)).toBe('1 week ago');
    });

    test('returns "X weeks ago" for multiple weeks', () => {
      const date = getRelativeDate(0, 0, 0, 0, 2);
      expect(formatRelativeTime(date)).toBe('2 weeks ago');
    });

    test('returns formatted date for dates older than 4 weeks', () => {
      const date = getRelativeDate(0, 0, 0, 0, 5);
      const result = formatRelativeTime(date);
      // Should match format like "Jan 15, 2024"
      expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
    });
  });

  describe('ISO string input', () => {
    test('handles ISO string format', () => {
      const date = getRelativeDate(0, 0, 2);
      const isoString = date.toISOString();
      expect(formatRelativeTime(isoString)).toBe('2 hours ago');
    });

    test('handles ISO string for days ago', () => {
      const date = getRelativeDate(0, 0, 0, 3);
      const isoString = date.toISOString();
      expect(formatRelativeTime(isoString)).toBe('3 days ago');
    });

    test('handles ISO string for weeks ago', () => {
      const date = getRelativeDate(0, 0, 0, 0, 2);
      const isoString = date.toISOString();
      expect(formatRelativeTime(isoString)).toBe('2 weeks ago');
    });
  });

  describe('Edge cases', () => {
    test('handles future dates gracefully', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in future
      expect(formatRelativeTime(futureDate)).toBe('just now');
    });

    test('throws error for invalid date string', () => {
      expect(() => formatRelativeTime('invalid-date')).toThrow('Invalid date provided');
    });

    test('throws error for invalid Date object', () => {
      expect(() => formatRelativeTime(new Date('invalid'))).toThrow('Invalid date provided');
    });

    test('handles boundary at 59 seconds (should be "just now")', () => {
      const date = getRelativeDate(59);
      expect(formatRelativeTime(date)).toBe('just now');
    });

    test('handles boundary at 60 seconds (should be "1 minute ago")', () => {
      const date = getRelativeDate(60);
      expect(formatRelativeTime(date)).toBe('1 minute ago');
    });

    test('handles boundary at 59 minutes (should be "59 minutes ago")', () => {
      const date = getRelativeDate(0, 59);
      expect(formatRelativeTime(date)).toBe('59 minutes ago');
    });

    test('handles boundary at 60 minutes (should be "1 hour ago")', () => {
      const date = getRelativeDate(0, 60);
      expect(formatRelativeTime(date)).toBe('1 hour ago');
    });

    test('handles boundary at 23 hours (should be "23 hours ago")', () => {
      const date = getRelativeDate(0, 0, 23);
      expect(formatRelativeTime(date)).toBe('23 hours ago');
    });

    test('handles boundary at 24 hours (should be "1 day ago")', () => {
      const date = getRelativeDate(0, 0, 24);
      expect(formatRelativeTime(date)).toBe('1 day ago');
    });

    test('handles boundary at 6 days (should be "6 days ago")', () => {
      const date = getRelativeDate(0, 0, 0, 6);
      expect(formatRelativeTime(date)).toBe('6 days ago');
    });

    test('handles boundary at 7 days (should be "1 week ago")', () => {
      const date = getRelativeDate(0, 0, 0, 7);
      expect(formatRelativeTime(date)).toBe('1 week ago');
    });

    test('handles boundary at 3 weeks (should be "3 weeks ago")', () => {
      const date = getRelativeDate(0, 0, 0, 0, 3);
      expect(formatRelativeTime(date)).toBe('3 weeks ago');
    });

    test('handles boundary at 4 weeks (should be formatted date)', () => {
      const date = getRelativeDate(0, 0, 0, 0, 4);
      const result = formatRelativeTime(date);
      expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
    });
  });

  describe('Real-world scenarios', () => {
    test('formats recent candidate activity (2 hours ago)', () => {
      const date = getRelativeDate(0, 0, 2);
      expect(formatRelativeTime(date)).toBe('2 hours ago');
    });

    test('formats candidate activity from yesterday', () => {
      const date = getRelativeDate(0, 0, 0, 1);
      expect(formatRelativeTime(date)).toBe('1 day ago');
    });

    test('formats candidate activity from last week', () => {
      const date = getRelativeDate(0, 0, 0, 0, 1);
      expect(formatRelativeTime(date)).toBe('1 week ago');
    });

    test('formats old candidate activity (2 months ago)', () => {
      const date = getRelativeDate(0, 0, 0, 60);
      const result = formatRelativeTime(date);
      expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4}$/);
    });
  });

  describe('Consistency', () => {
    test('returns same result for same timestamp called multiple times', () => {
      const date = getRelativeDate(0, 0, 5);
      const result1 = formatRelativeTime(date);
      const result2 = formatRelativeTime(date);
      expect(result1).toBe(result2);
    });

    test('handles both Date and ISO string for same timestamp consistently', () => {
      const date = getRelativeDate(0, 0, 3);
      const isoString = date.toISOString();
      const result1 = formatRelativeTime(date);
      const result2 = formatRelativeTime(isoString);
      expect(result1).toBe(result2);
    });
  });
});
