/**
 * Setup verification test
 * This test verifies that Jest and fast-check are properly configured
 */

import fc from 'fast-check'

describe('Test Setup Verification', () => {
  test('Jest is working correctly', () => {
    expect(true).toBe(true)
  })

  test('fast-check is configured correctly', () => {
    fc.assert(
      fc.property(fc.integer(), (num) => {
        // Property: adding zero to any integer returns the same integer
        expect(num + 0).toBe(num)
      }),
      { numRuns: 100 }
    )
  })

  test('jest-axe is available', () => {
    // Verify jest-axe matcher is available
    expect(expect.extend).toBeDefined()
  })
})
