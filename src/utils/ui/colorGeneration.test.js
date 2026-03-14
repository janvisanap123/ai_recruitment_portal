import { generateColorFromString } from './colorGeneration';

describe('generateColorFromString', () => {
  test('generates consistent color for same string', () => {
    const name = 'John Doe';
    const color1 = generateColorFromString(name);
    const color2 = generateColorFromString(name);
    
    expect(color1).toBe(color2);
  });

  test('generates different colors for different strings', () => {
    const color1 = generateColorFromString('Alice');
    const color2 = generateColorFromString('Bob');
    
    expect(color1).not.toBe(color2);
  });

  test('returns HSL color format', () => {
    const color = generateColorFromString('Test');
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  test('uses fixed saturation of 65%', () => {
    const color = generateColorFromString('Test');
    
    expect(color).toContain('65%');
  });

  test('uses fixed lightness of 55%', () => {
    const color = generateColorFromString('Test');
    
    expect(color).toContain('55%');
  });

  test('generates valid hue value (0-359)', () => {
    const color = generateColorFromString('Test');
    const hueMatch = color.match(/hsl\((\d+),/);
    const hue = parseInt(hueMatch[1], 10);
    
    expect(hue).toBeGreaterThanOrEqual(0);
    expect(hue).toBeLessThan(360);
  });

  test('handles empty string', () => {
    const color = generateColorFromString('');
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  test('handles single character', () => {
    const color = generateColorFromString('A');
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  test('handles special characters', () => {
    const color = generateColorFromString('!@#$%^&*()');
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  test('handles unicode characters', () => {
    const color = generateColorFromString('你好世界');
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  test('generates consistent colors for common candidate names', () => {
    const names = ['John Doe', 'Jane Smith', 'Alice Johnson'];
    
    names.forEach(name => {
      const color1 = generateColorFromString(name);
      const color2 = generateColorFromString(name);
      expect(color1).toBe(color2);
    });
  });

  test('generates consistent colors for pipeline stages', () => {
    const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
    
    stages.forEach(stage => {
      const color1 = generateColorFromString(stage);
      const color2 = generateColorFromString(stage);
      expect(color1).toBe(color2);
    });
  });
});
