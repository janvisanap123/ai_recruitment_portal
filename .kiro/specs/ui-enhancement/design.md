# Design Document: UI Enhancement

## Overview

This design document outlines the technical approach for enhancing the VectorHire recruiting application's post-login UI. The enhancements focus on improving visual feedback, user experience, interactivity, and accessibility while maintaining the existing glass-morphism design language with dark theme.

The application currently uses Next.js 14 with App Router, React client components, Tailwind CSS, and custom CSS variables. The design will introduce new reusable components and utilities that integrate seamlessly with the existing architecture.

### Key Design Goals

- Maintain existing glass-morphism aesthetic and dark theme
- Create reusable, composable UI components
- Ensure all enhancements are accessible (WCAG 2.1 AA compliant)
- Optimize for performance with minimal bundle size impact
- Support responsive design from mobile to desktop
- Provide clear visual feedback for all user interactions

## Architecture

### Component Architecture

The UI enhancements will follow a layered component architecture:

**Layer 1: Primitive Components**
- `LoadingSkeleton` - Animated placeholder for loading states
- `Toast` - Notification component with variants (success, error, info)
- `Avatar` - User avatar with initials and color generation
- `Badge` - Status indicators and filter badges
- `Tooltip` - Hover information display

**Layer 2: Composite Components**
- `ToastContainer` - Toast notification manager
- `FilterBadgeList` - Active filter display with removal
- `MultiSelectInput` - Tag-based multi-select for skills
- `SearchSuggestions` - Autocomplete dropdown for search
- `MobileDrawer` - Slide-out panel for mobile filters

**Layer 3: Feature Components**
- `CandidateTableSkeleton` - Loading state for candidate table
- `EmptyState` - Illustrated empty state with actions
- `UploadProgressList` - Multi-file upload progress display
- `FilterPresetManager` - Save and load filter presets

### State Management

The design uses React's built-in state management:

- **Local Component State**: For UI-only state (hover, focus, open/closed)
- **Lifted State**: For shared state between sibling components (filters, search query)
- **Context API**: For global UI state (toast notifications, theme preferences)

### Animation System

Animations will use CSS transitions and keyframe animations for performance:

- **Micro-interactions**: Hover effects, button presses (CSS transitions)
- **Loading states**: Skeleton shimmer, progress bars (CSS keyframes)
- **Page transitions**: Fade-in, slide-in (CSS animations with Intersection Observer)
- **Gestures**: Swipe-to-dismiss (Touch events + CSS transforms)

## Components and Interfaces

### Core UI Components

#### LoadingSkeleton Component

```typescript
interface LoadingSkeletonProps {
  variant: 'text' | 'circular' | 'rectangular' | 'table-row';
  width?: string | number;
  height?: string | number;
  count?: number; // For multiple skeleton items
  className?: string;
}
```

Renders animated placeholder with shimmer effect using existing glass-card styling.

#### Toast Component

```typescript
interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // Auto-dismiss duration in ms
  onDismiss: (id: string) => void;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => void;
  dismissToast: (id: string) => void;
}
```

Toast notifications appear in top-right corner, support swipe-to-dismiss on mobile, and auto-dismiss after duration.

#### Avatar Component

```typescript
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

Generates consistent color from name hash, displays initials (first letter of first and last name).

#### Badge Component

```typescript
interface BadgeProps {
  variant: 'status' | 'filter' | 'count';
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  children: React.ReactNode;
  onRemove?: () => void; // For dismissible badges
  className?: string;
}
```

Status badges use color-coding based on pipeline stage. Filter badges include remove button.

#### Tooltip Component

```typescript
interface TooltipProps {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}
```

Appears on hover with 200ms delay, uses portal for proper z-index layering.

### Advanced Components

#### MultiSelectInput Component

```typescript
interface MultiSelectInputProps {
  value: string[]; // Selected values
  onChange: (values: string[]) => void;
  suggestions?: string[]; // Available options
  placeholder?: string;
  label?: string;
}
```

Tag-based input with autocomplete dropdown, keyboard navigation (Arrow keys, Enter, Backspace to remove last tag).

#### SearchSuggestions Component

```typescript
interface SearchSuggestionsProps {
  query: string;
  suggestions: Array<{
    type: 'candidate' | 'skill' | 'location';
    value: string;
    count?: number;
  }>;
  onSelect: (suggestion: string) => void;
  isOpen: boolean;
}
```

Dropdown appears below search input, groups suggestions by type, highlights matching text.

#### MobileDrawer Component

```typescript
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'bottom';
  children: React.ReactNode;
}
```

Slide-out panel with backdrop overlay, supports swipe-to-close gesture, traps focus when open.

#### FilterPresetManager Component

```typescript
interface FilterPreset {
  id: string;
  name: string;
  filters: {
    skills: string;
    experience: string;
    location: string;
  };
}

interface FilterPresetManagerProps {
  currentFilters: FilterPreset['filters'];
  onApplyPreset: (preset: FilterPreset) => void;
  onSavePreset: (name: string, filters: FilterPreset['filters']) => void;
}
```

Stores presets in localStorage, displays saved presets in dropdown, allows naming and deletion.

### Utility Functions

#### Color Generation

```typescript
function generateColorFromString(str: string): string;
```

Generates consistent HSL color from string hash for avatars and status indicators.

#### Relative Time Formatting

```typescript
function formatRelativeTime(date: Date | string): string;
```

Converts timestamps to relative format ("2 hours ago", "3 days ago", "2 weeks ago").

#### Debounce

```typescript
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void;
```

Debounces search input and filter changes to reduce API calls.

## Data Models

### Toast Notification State

```typescript
interface ToastState {
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    action?: {
      label: string;
      onClick: () => void;
    };
    createdAt: number;
  }>;
}
```

### Upload Progress State

```typescript
interface UploadProgress {
  fileId: string;
  fileName: string;
  fileSize: number;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  candidateName?: string; // Available after successful parse
}
```

### Filter State Extension

```typescript
interface FilterState {
  skills: string[]; // Changed from string to string[] for multi-select
  experience: string;
  location: string;
  activePresetId?: string;
}

interface FilterPreset {
  id: string;
  name: string;
  filters: Omit<FilterState, 'activePresetId'>;
  createdAt: number;
}
```

### Table Sort State

```typescript
interface SortState {
  column: 'name' | 'skills' | 'experience' | 'location' | 'updatedAt' | null;
  direction: 'asc' | 'desc';
}
```

### Responsive Breakpoints

The design uses Tailwind's default breakpoints:
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all 36 acceptance criteria, I identified the following consolidation opportunities:

- Properties 1.3, 1.4, and 1.5 all test CSS class application for visual effects - these can be combined into a general "visual feedback property"
- Properties 3.3 and 3.4 both test table sorting - 3.4 subsumes 3.3 as it tests both sorting and indicator display
- Properties 4.3 and 4.4 both test filter badge behavior - these can be combined into one comprehensive property
- Properties 6.1 and 6.2 both test keyboard focus behavior - these can be combined into one property about focus management

After consolidation, we have 32 unique testable properties.

### Property 1: Loading Skeleton Display

*For any* search or filter operation in progress, the Dashboard should render a loading skeleton component in place of the candidate table.

**Validates: Requirements 1.1**

### Property 2: Empty State Display

*For any* search or filter result that returns zero candidates, the Dashboard should render an empty state component with actionable suggestions.

**Validates: Requirements 1.2**

### Property 3: Interactive Visual Feedback

*For any* interactive UI element (stat cards, table rows, buttons), hovering or clicking should apply the appropriate CSS classes for visual feedback (scale, glow, highlight, fade-in).

**Validates: Requirements 1.3, 1.4, 1.5**

### Property 4: Drag-Over Visual Feedback

*For any* file drag event over the upload zone, the component should apply the drag-over CSS class showing the border pulse effect.

**Validates: Requirements 2.1**

### Property 5: Upload Progress Display

*For any* set of files being uploaded, the UI should render an individual progress bar component for each file with current progress percentage.

**Validates: Requirements 2.2**

### Property 6: Success Toast Display

*For any* successful file upload, the UI should display a success toast notification containing the parsed candidate name.

**Validates: Requirements 2.3**

### Property 7: Error Toast Display

*For any* failed file upload, the UI should display an error toast notification with a retry action button.

**Validates: Requirements 2.4**

### Property 8: PDF Thumbnail Display

*For any* PDF file selected for upload, the UI should render a thumbnail preview element.

**Validates: Requirements 2.5**

### Property 9: Batch Upload Summary

*For any* multiple file selection, the UI should display a summary showing the correct total count and combined file size.

**Validates: Requirements 2.6**

### Property 10: Status Indicator Color Mapping

*For any* candidate with a pipeline stage, the candidate card should display a status indicator with a color that consistently maps to that pipeline stage.

**Validates: Requirements 3.1**

### Property 11: Skill Tooltip Display

*For any* skill tag in the UI, hovering over it should display a tooltip showing the count of candidates with that skill.

**Validates: Requirements 3.2**

### Property 12: Table Sorting with Indicator

*For any* sortable table column header that is clicked, the table should re-order candidates by that column and display a sort direction indicator (ascending or descending arrow).

**Validates: Requirements 3.3, 3.4**

### Property 13: Avatar Consistency

*For any* candidate name, the avatar component should generate the same initials and color every time that name is rendered.

**Validates: Requirements 3.5**

### Property 14: Relative Time Formatting

*For any* timestamp, the UI should display it in relative format ("X hours ago", "X days ago") when it's recent.

**Validates: Requirements 3.6**

### Property 15: Search Suggestions Display

*For any* text input in the search field, the UI should display a suggestions dropdown with options derived from existing candidate data.

**Validates: Requirements 4.1**

### Property 16: Multi-Select Tag Display

*For any* skill selected in the multi-select filter, the UI should render a tag element for that skill.

**Validates: Requirements 4.2**

### Property 17: Filter Badge Management

*For any* active filter, the UI should display a badge above the results, and clicking that badge should remove the filter and update the results.

**Validates: Requirements 4.3, 4.4**

### Property 18: Filter Preset Saving

*For any* current filter state and custom name provided, the save preset function should store the filters with that name in localStorage.

**Validates: Requirements 4.5**

### Property 19: Filter Preset Application

*For any* saved filter preset that is selected, the Dashboard should update the filter state to match all the preset's filter values and display the preset name.

**Validates: Requirements 4.6**

### Property 20: Mobile Stats Layout

*For any* viewport width below the mobile breakpoint (640px), the Dashboard stats should render in a single column layout.

**Validates: Requirements 5.1**

### Property 21: Mobile Table Transformation

*For any* viewport width below the mobile breakpoint (640px), the candidate table should render as card components instead of table rows.

**Validates: Requirements 5.2**

### Property 22: Mobile Filter Drawer

*For any* viewport width below the mobile breakpoint (640px), the filter panel should be hidden and accessible via a slide-out drawer component.

**Validates: Requirements 5.3**

### Property 23: Drawer Backdrop Display

*For any* mobile drawer that is opened, the UI should render a backdrop overlay element.

**Validates: Requirements 5.4**

### Property 24: Swipe-to-Dismiss Gesture

*For any* toast notification on a touch device, swiping the notification should trigger the dismiss action.

**Validates: Requirements 5.5**

### Property 25: Tablet Grid Layout

*For any* viewport width at the tablet breakpoint (768px-1023px), the Candidates page should display candidates in a 2-column grid.

**Validates: Requirements 5.6**

### Property 26: Keyboard Focus Management

*For any* interactive element in the UI, it should be focusable via Tab/Shift+Tab and display a visible focus indicator with the accent color when focused.

**Validates: Requirements 6.1, 6.2**

### Property 27: Icon Button ARIA Labels

*For any* icon-only button in the UI, it should have an aria-label or aria-labelledby attribute providing a text description.

**Validates: Requirements 6.3**

### Property 28: Table Arrow Key Navigation

*For any* candidate table row, pressing arrow keys (up/down) should move focus to the adjacent row.

**Validates: Requirements 6.4**

### Property 29: Enter Key Activation

*For any* focused candidate row, pressing the Enter key should trigger navigation to that candidate's profile page.

**Validates: Requirements 6.5**

### Property 30: ARIA Live Regions

*For any* dynamic content area (search results, toast notifications, loading states), the container should have an appropriate aria-live attribute to announce changes to screen readers.

**Validates: Requirements 6.6**

### Property 31: Toast Auto-Dismiss

*For any* toast notification with a duration specified, the toast should automatically dismiss after that duration elapses.

**Validates: Requirements 2.3, 2.4** (implicit requirement for toast behavior)

### Property 32: Color Generation Determinism

*For any* string input to the color generation function, it should always return the same HSL color value for that string.

**Validates: Requirements 3.1, 3.5** (supporting property for consistent UI)

## Error Handling

### Component Error Boundaries

All new components will be wrapped in React Error Boundaries to prevent UI crashes:

- Toast notifications that fail to render will be logged but won't crash the app
- Loading skeletons that fail will fall back to simple loading text
- Upload progress components that error will show a generic error state

### Upload Error Handling

File upload errors are categorized and handled appropriately:

- **File Type Errors**: Rejected before upload, shown immediately with error message
- **File Size Errors**: Rejected if file exceeds 10MB limit
- **Network Errors**: Shown in error toast with retry action
- **Parse Errors**: Shown in error toast with option to view raw file
- **Partial Success**: When batch uploading, successful files are processed while failed files are listed separately

### Accessibility Error Prevention

- All interactive elements have fallback text for screen readers
- Focus trap in modals/drawers prevents focus from escaping
- Keyboard navigation always has a visible focus indicator
- ARIA attributes are validated during development

### Responsive Layout Fallbacks

- If viewport detection fails, default to desktop layout
- Touch gesture detection falls back to click events
- Mobile drawer can always be closed via close button if swipe fails

## Testing Strategy

### Dual Testing Approach

This feature will use both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** will focus on:
- Specific examples of component rendering (e.g., "renders a success toast with message")
- Edge cases (e.g., empty file list, zero candidates, very long names)
- Integration points (e.g., toast context provider, filter state management)
- Error conditions (e.g., invalid file types, failed uploads)

**Property-Based Tests** will focus on:
- Universal properties that hold for all inputs (e.g., "any name generates consistent avatar color")
- Comprehensive input coverage through randomization (e.g., random candidate data, random filter combinations)
- Invariants that must always hold (e.g., "active filters always have corresponding badges")

### Property-Based Testing Configuration

We will use **fast-check** (JavaScript/TypeScript property-based testing library) for implementing property tests.

**Configuration:**
- Minimum 100 iterations per property test
- Each property test will reference its design document property in a comment
- Tag format: `// Feature: ui-enhancement, Property {number}: {property_text}`

**Example Property Test Structure:**

```typescript
import fc from 'fast-check';

// Feature: ui-enhancement, Property 13: Avatar Consistency
test('avatar generates consistent color and initials for same name', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1 }), // Generate random names
      (name) => {
        const avatar1 = generateAvatar(name);
        const avatar2 = generateAvatar(name);
        
        // Same name should always produce same result
        expect(avatar1.color).toBe(avatar2.color);
        expect(avatar1.initials).toBe(avatar2.initials);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Test Coverage Areas

1. **Component Rendering**
   - LoadingSkeleton renders with correct variant
   - Toast displays with correct type styling
   - Avatar shows correct initials for "John Doe"
   - Badge renders with remove button when onRemove provided

2. **User Interactions**
   - Clicking filter badge removes filter
   - Clicking table header toggles sort direction
   - Pressing Enter on row navigates to profile
   - Swiping toast dismisses it

3. **State Management**
   - Toast context adds and removes toasts correctly
   - Filter state updates when preset is applied
   - Upload progress updates as files upload
   - Sort state toggles between asc/desc/null

4. **Edge Cases**
   - Empty candidate list shows empty state
   - Single character name generates valid avatar
   - Very long skill list truncates properly
   - Zero byte file is rejected

5. **Accessibility**
   - All buttons have accessible names
   - Focus trap works in mobile drawer
   - ARIA live regions announce changes
   - Keyboard navigation reaches all interactive elements

### Testing Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing with accessibility focus
- **fast-check**: Property-based testing library
- **jest-axe**: Automated accessibility testing
- **MSW (Mock Service Worker)**: API mocking for upload tests

### Performance Testing

While not part of automated tests, manual performance checks will verify:
- Loading skeleton animations run at 60fps
- Toast notifications don't cause layout thrashing
- Large candidate lists (1000+) render smoothly
- Mobile drawer animations are smooth on low-end devices

## Implementation Notes

### CSS Animation Performance

All animations use `transform` and `opacity` properties for GPU acceleration:

```css
/* Good - GPU accelerated */
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Avoid - causes reflow */
.bad-animation {
  animation: badFadeIn 0.3s ease-in;
}

@keyframes badFadeIn {
  from { margin-top: 10px; }
  to { margin-top: 0; }
}
```

### Accessibility Implementation

Focus management follows these principles:

1. **Focus Trap**: When modal/drawer opens, focus moves to first interactive element and cycles within
2. **Focus Restoration**: When modal/drawer closes, focus returns to trigger element
3. **Skip Links**: Main content areas have skip links for keyboard users
4. **Focus Indicators**: Always visible, never removed with `outline: none` without replacement

### Responsive Implementation

Use Tailwind's responsive utilities with mobile-first approach:

```jsx
{/* Mobile: drawer, Desktop: sidebar */}
<div className="lg:block hidden">
  <FilterPanel /> {/* Desktop sidebar */}
</div>
<div className="lg:hidden">
  <MobileDrawer> {/* Mobile drawer */}
    <FilterPanel />
  </MobileDrawer>
</div>
```

### LocalStorage Schema

Filter presets stored in localStorage:

```typescript
// Key: 'vectorhire_filter_presets'
// Value: JSON string of FilterPreset[]
[
  {
    id: "uuid-v4",
    name: "Senior Python Developers",
    filters: {
      skills: ["Python", "Django"],
      experience: "5",
      location: "Remote"
    },
    createdAt: 1234567890
  }
]
```

### Toast Notification Queue

Toasts are managed in a queue with max 3 visible at once:
- New toasts push to queue
- If 3 toasts visible, new toast waits
- When toast dismisses, next in queue appears
- Toasts stack vertically with 8px gap

### Color Generation Algorithm

Avatar and status colors use consistent hashing:

```typescript
function generateColorFromString(str: string): string {
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
```

## Migration Strategy

### Phase 1: Core Components (Week 1)
- Implement LoadingSkeleton, Toast, Avatar, Badge, Tooltip
- Add ToastContext provider to app layout
- Create utility functions (color generation, relative time, debounce)

### Phase 2: Dashboard Enhancements (Week 2)
- Add loading skeletons to Dashboard
- Implement empty state component
- Add stat card hover effects
- Implement table sorting with indicators
- Add relative timestamps

### Phase 3: Upload Experience (Week 3)
- Implement upload progress tracking
- Add toast notifications for upload success/failure
- Add PDF thumbnail preview
- Implement batch upload summary

### Phase 4: Advanced Filtering (Week 4)
- Implement MultiSelectInput for skills
- Add SearchSuggestions component
- Implement filter badges
- Add FilterPresetManager

### Phase 5: Responsive & Accessibility (Week 5)
- Implement MobileDrawer component
- Add responsive layouts for all pages
- Implement keyboard navigation
- Add ARIA labels and live regions
- Implement swipe gestures

### Phase 6: Testing & Polish (Week 6)
- Write unit tests for all components
- Write property-based tests for all properties
- Run accessibility audit with jest-axe
- Performance testing and optimization
- Bug fixes and polish

## Dependencies

### New Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0" // Optional: for advanced animations
  },
  "devDependencies": {
    "fast-check": "^3.15.0", // Property-based testing
    "jest-axe": "^8.0.0", // Accessibility testing
    "@testing-library/react": "^14.0.0", // Already installed
    "@testing-library/jest-dom": "^6.0.0", // Already installed
    "@testing-library/user-event": "^14.0.0" // User interaction testing
  }
}
```

### Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Android: Last 2 versions

All features degrade gracefully in older browsers:
- CSS animations fall back to instant transitions
- Touch gestures fall back to click events
- Modern CSS features have fallbacks

## Conclusion

This design provides a comprehensive approach to enhancing the VectorHire UI while maintaining the existing design language and architecture. The component-based approach ensures reusability, the dual testing strategy ensures correctness, and the accessibility-first implementation ensures the application is usable by everyone.

The phased migration strategy allows for incremental delivery and testing, reducing risk and allowing for feedback incorporation throughout the implementation process.
