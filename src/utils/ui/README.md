# UI Utilities

This directory contains utility functions for UI-related operations.

## Utilities

### colorGeneration

Generate consistent HSL colors from strings using a hash function.

```javascript
import { generateColorFromString } from '@/utils/ui/colorGeneration';

const color = generateColorFromString('John Doe');
// Returns: "hsl(123, 65%, 55%)"
```

### relativeTime

Format timestamps as relative time strings (e.g., "2 hours ago", "3 days ago").

```javascript
import { formatRelativeTime } from '@/utils/ui/relativeTime';

// With Date object
const date = new Date('2024-01-15T10:00:00Z');
formatRelativeTime(date); // Returns: "2 hours ago"

// With ISO string
formatRelativeTime('2024-01-15T10:00:00Z'); // Returns: "2 hours ago"
```

Supported formats:
- "just now" (< 1 minute)
- "X minutes ago" (< 1 hour)
- "X hours ago" (< 1 day)
- "X days ago" (< 1 week)
- "X weeks ago" (< 4 weeks)
- "Jan 15, 2024" (>= 4 weeks)

### debounce

Debounce function calls (coming soon).

### accessibility

Accessibility helper functions (coming soon).

## Usage

Utility functions should:
- Be pure functions when possible
- Have clear, single responsibilities
- Be well-tested
- Be framework-agnostic when possible
