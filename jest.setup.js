// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Configure jest-axe for accessibility testing
import { toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Suppress console errors in tests (optional)
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}
