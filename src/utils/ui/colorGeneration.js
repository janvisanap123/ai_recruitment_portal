/**
 * Generates a consistent HSL color from a string using a simple hash function.
 * The same string will always produce the same color.
 * 
 * @param {string} str - The input string to generate a color from
 * @returns {string} HSL color string in format "hsl(hue, saturation%, lightness%)"
 * 
 * @example
 * generateColorFromString("John Doe") // Returns consistent color for this name
 * generateColorFromString("Applied") // Returns consistent color for this stage
 */
export function generateColorFromString(str) {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert to HSL for better color distribution
  const hue = Math.abs(hash % 360);
  const saturation = 65; // Fixed saturation for consistency
  const lightness = 55; // Fixed lightness for readability
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
