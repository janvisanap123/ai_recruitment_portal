# Implementation Plan: UI Enhancement

## Overview

This implementation plan breaks down the UI enhancement feature into discrete coding tasks following a layered approach: utilities and primitives first, then composite components, then feature components, and finally integration. The plan follows a 6-phase migration strategy with testing integrated throughout.

## Tasks

- [x] 1. Set up project structure and dependencies
  - Install required dependencies: fast-check, jest-axe, @testing-library/user-event
  - Create directory structure: `components/ui/primitives`, `components/ui/composite`, `components/ui/feature`, `utils/ui`
  - Set up fast-check configuration in Jest config
  - _Requirements: All (foundational)_

- [ ] 2. Implement utility functions
  - [x] 2.1 Create color generation utility
    - Implement `generateColorFromString` function with consistent hashing algorithm
    - Function should convert string to HSL color with fixed saturation and lightness
    - _Requirements: 3.1, 3.5_
  
  - [ ]* 2.2 Write property test for color generation
    - **Property 32: Color Generation Determinism**
    - **Validates: Requirements 3.1, 3.5**
  
  - [x] 2.3 Create relative time formatting utility
    - Implement `formatRelativeTime` function to convert timestamps to relative format
    - Support "X hours ago", "X days ago", "X weeks ago" formats
    - _Requirements: 3.6_
  
  - [ ] 2.4 Create debounce utility
    - Implement generic `debounce` function with configurable delay
    - _Requirements: 4.1_

- [ ] 3. Implement primitive components (Layer 1)
  - [ ] 3.1 Create LoadingSkeleton component
    - Implement component with variants: text, circular, rectangular, table-row
    - Add shimmer animation using CSS keyframes
    - Support width, height, count, and className props
    - _Requirements: 1.1_
  
  - [ ]* 3.2 Write property test for LoadingSkeleton
    - **Property 1: Loading Skeleton Display**
    - **Validates: Requirements 1.1**
  
  - [ ] 3.3 Create Toast component
    - Implement Toast component with type variants: success, error, info, warning
    - Add auto-dismiss functionality with configurable duration
    - Support optional action button
    - Implement swipe-to-dismiss for touch devices
    - _Requirements: 2.3, 2.4_
  
  - [ ]* 3.4 Write property tests for Toast
    - **Property 6: Success Toast Display**
    - **Property 7: Error Toast Display**
    - **Property 31: Toast Auto-Dismiss**
    - **Property 24: Swipe-to-Dismiss Gesture**
    - **Validates: Requirements 2.3, 2.4, 5.5**
  
  - [ ] 3.5 Create Avatar component
    - Implement Avatar with size variants: sm, md, lg
    - Generate initials from name (first letter of first and last name)
    - Use color generation utility for consistent background color
    - _Requirements: 3.5_
  
  - [ ]* 3.6 Write property test for Avatar
    - **Property 13: Avatar Consistency**
    - **Validates: Requirements 3.5**
  
  - [ ] 3.7 Create Badge component
    - Implement Badge with variants: status, filter, count
    - Support color variants: default, success, warning, error, info
    - Add optional remove button for dismissible badges
    - _Requirements: 3.1, 4.3_
  
  - [ ]* 3.8 Write property test for Badge
    - **Property 10: Status Indicator Color Mapping**
    - **Validates: Requirements 3.1**
  
  - [ ] 3.9 Create Tooltip component
    - Implement Tooltip with position variants: top, bottom, left, right
    - Add 200ms hover delay
    - Use React portal for proper z-index layering
    - _Requirements: 3.2_
  
  - [ ]* 3.10 Write property test for Tooltip
    - **Property 11: Skill Tooltip Display**
    - **Validates: Requirements 3.2**

- [ ] 4. Create ToastContext and provider
  - [ ] 4.1 Implement ToastContext with state management
    - Create context with showToast and dismissToast functions
    - Implement toast queue with max 3 visible toasts
    - Add ToastContainer component to render toast stack
    - _Requirements: 2.3, 2.4_
  
  - [ ] 4.2 Add ToastContext provider to app layout
    - Wrap app with ToastProvider in root layout
    - Position ToastContainer in top-right corner
    - _Requirements: 2.3, 2.4_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Implement composite components (Layer 2)
  - [ ] 6.1 Create MultiSelectInput component
    - Implement tag-based multi-select with autocomplete dropdown
    - Add keyboard navigation: Arrow keys, Enter, Backspace to remove
    - Use debounce utility for suggestions filtering
    - _Requirements: 4.2_
  
  - [ ]* 6.2 Write property test for MultiSelectInput
    - **Property 16: Multi-Select Tag Display**
    - **Validates: Requirements 4.2**
  
  - [ ] 6.3 Create SearchSuggestions component
    - Implement dropdown with grouped suggestions by type
    - Highlight matching text in suggestions
    - Add keyboard navigation support
    - _Requirements: 4.1_
  
  - [ ]* 6.4 Write property test for SearchSuggestions
    - **Property 15: Search Suggestions Display**
    - **Validates: Requirements 4.1**
  
  - [ ] 6.5 Create MobileDrawer component
    - Implement slide-out panel with position variants: left, right, bottom
    - Add backdrop overlay with click-to-close
    - Implement focus trap when drawer is open
    - Support swipe-to-close gesture
    - _Requirements: 5.3, 5.4_
  
  - [ ]* 6.6 Write property tests for MobileDrawer
    - **Property 22: Mobile Filter Drawer**
    - **Property 23: Drawer Backdrop Display**
    - **Validates: Requirements 5.3, 5.4**
  
  - [ ] 6.7 Create FilterBadgeList component
    - Implement list of active filter badges
    - Each badge should have remove functionality
    - Update filter state when badge is removed
    - _Requirements: 4.3, 4.4_
  
  - [ ]* 6.8 Write property test for FilterBadgeList
    - **Property 17: Filter Badge Management**
    - **Validates: Requirements 4.3, 4.4**

- [ ] 7. Implement feature components (Layer 3)
  - [ ] 7.1 Create EmptyState component
    - Implement empty state with illustration and actionable suggestions
    - Support customizable message and action buttons
    - _Requirements: 1.2_
  
  - [ ]* 7.2 Write property test for EmptyState
    - **Property 2: Empty State Display**
    - **Validates: Requirements 1.2**
  
  - [ ] 7.3 Create CandidateTableSkeleton component
    - Implement table skeleton using LoadingSkeleton components
    - Match structure of actual candidate table
    - _Requirements: 1.1_
  
  - [ ] 7.4 Create UploadProgressList component
    - Implement list of upload progress items with individual progress bars
    - Show file name, size, progress percentage, and status
    - Display candidate name after successful parse
    - Show error message and retry button for failed uploads
    - _Requirements: 2.2, 2.3, 2.4_
  
  - [ ]* 7.5 Write property tests for UploadProgressList
    - **Property 5: Upload Progress Display**
    - **Property 9: Batch Upload Summary**
    - **Validates: Requirements 2.2, 2.6**
  
  - [ ] 7.6 Create FilterPresetManager component
    - Implement preset dropdown with save/load functionality
    - Store presets in localStorage with schema: `vectorhire_filter_presets`
    - Support preset naming and deletion
    - Display active preset name
    - _Requirements: 4.5, 4.6_
  
  - [ ]* 7.7 Write property tests for FilterPresetManager
    - **Property 18: Filter Preset Saving**
    - **Property 19: Filter Preset Application**
    - **Validates: Requirements 4.5, 4.6**

- [ ] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Enhance Dashboard page
  - [ ] 9.1 Add loading skeleton to Dashboard
    - Replace loading text with CandidateTableSkeleton component
    - Show skeleton during search and filter operations
    - _Requirements: 1.1_
  
  - [ ] 9.2 Add empty state to Dashboard
    - Show EmptyState component when search returns zero results
    - Include suggestions to clear filters or adjust search
    - _Requirements: 1.2_
  
  - [ ] 9.3 Add stat card hover effects
    - Apply scale animation and glow effect CSS on hover
    - Use transform and opacity for GPU acceleration
    - _Requirements: 1.3_
  
  - [ ]* 9.4 Write property test for stat card effects
    - **Property 3: Interactive Visual Feedback**
    - **Validates: Requirements 1.3, 1.4, 1.5**
  
  - [ ] 9.5 Implement table sorting
    - Add click handlers to sortable column headers
    - Implement sort state management (column, direction)
    - Display sort direction indicator (arrow icon)
    - Re-order candidates based on sort state
    - _Requirements: 3.3, 3.4_
  
  - [ ]* 9.6 Write property test for table sorting
    - **Property 12: Table Sorting with Indicator**
    - **Validates: Requirements 3.3, 3.4**
  
  - [ ] 9.7 Add table row interactions
    - Add hover highlight effect with smooth color transition
    - Add click handler for row navigation
    - _Requirements: 1.4_
  
  - [ ] 9.8 Add fade-in animations for loaded data
    - Apply fade-in CSS animation to candidate rows
    - Use Intersection Observer for staggered animation
    - _Requirements: 1.5_
  
  - [ ] 9.9 Add relative timestamps to table
    - Replace absolute timestamps with formatRelativeTime utility
    - _Requirements: 3.6_
  
  - [ ]* 9.10 Write property test for relative time
    - **Property 14: Relative Time Formatting**
    - **Validates: Requirements 3.6**

- [ ] 10. Enhance Filter Panel
  - [ ] 10.1 Replace skills input with MultiSelectInput
    - Update filter state to use string array for skills
    - Integrate MultiSelectInput component
    - _Requirements: 4.2_
  
  - [ ] 10.2 Add search suggestions to search input
    - Integrate SearchSuggestions component
    - Generate suggestions from existing candidate data
    - Debounce search input
    - _Requirements: 4.1_
  
  - [ ] 10.3 Add FilterBadgeList above results
    - Display active filter badges
    - Wire up badge removal to filter state
    - _Requirements: 4.3, 4.4_
  
  - [ ] 10.4 Add FilterPresetManager to filter panel
    - Integrate FilterPresetManager component
    - Wire up preset save/load to filter state
    - _Requirements: 4.5, 4.6_

- [ ] 11. Enhance Upload Resume page
  - [ ] 11.1 Add drag-over visual feedback
    - Apply border pulse animation CSS on drag-over event
    - Remove animation on drag-leave and drop events
    - _Requirements: 2.1_
  
  - [ ]* 11.2 Write property test for drag-over feedback
    - **Property 4: Drag-Over Visual Feedback**
    - **Validates: Requirements 2.1**
  
  - [ ] 11.3 Implement upload progress tracking
    - Create upload progress state for each file
    - Update progress as upload proceeds
    - Integrate UploadProgressList component
    - _Requirements: 2.2_
  
  - [ ] 11.4 Add toast notifications for upload results
    - Show success toast with candidate name on successful upload
    - Show error toast with retry action on failed upload
    - Use ToastContext to display notifications
    - _Requirements: 2.3, 2.4_
  
  - [ ] 11.5 Add PDF thumbnail preview
    - Generate thumbnail for selected PDF files
    - Display thumbnail in upload list
    - _Requirements: 2.5_
  
  - [ ]* 11.6 Write property test for PDF thumbnail
    - **Property 8: PDF Thumbnail Display**
    - **Validates: Requirements 2.5**
  
  - [ ] 11.7 Add batch upload summary
    - Calculate and display total file count and combined size
    - Update summary as files are added/removed
    - _Requirements: 2.6_

- [ ] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Enhance Candidate Cards
  - [ ] 13.1 Add status indicator to cards
    - Integrate Badge component with status variant
    - Map pipeline stage to color using consistent scheme
    - _Requirements: 3.1_
  
  - [ ] 13.2 Add skill tooltips to cards
    - Wrap skill tags with Tooltip component
    - Display count of candidates with that skill
    - _Requirements: 3.2_
  
  - [ ] 13.3 Add Avatar to cards
    - Integrate Avatar component
    - Display candidate initials with consistent color
    - _Requirements: 3.5_

- [ ] 14. Implement responsive layouts
  - [ ] 14.1 Add mobile stats layout
    - Apply single column layout for stats on mobile (< 640px)
    - Use Tailwind responsive utilities
    - _Requirements: 5.1_
  
  - [ ]* 14.2 Write property test for mobile stats
    - **Property 20: Mobile Stats Layout**
    - **Validates: Requirements 5.1**
  
  - [ ] 14.3 Transform table to cards on mobile
    - Render candidate cards instead of table rows on mobile
    - Maintain all functionality in card format
    - _Requirements: 5.2_
  
  - [ ]* 14.4 Write property test for mobile table transformation
    - **Property 21: Mobile Table Transformation**
    - **Validates: Requirements 5.2**
  
  - [ ] 14.5 Add mobile filter drawer
    - Wrap Filter Panel in MobileDrawer on mobile
    - Add filter button to open drawer
    - _Requirements: 5.3_
  
  - [ ] 14.6 Add tablet grid layout to Candidates page
    - Apply 2-column grid layout on tablet (768px-1023px)
    - Use Tailwind responsive utilities
    - _Requirements: 5.6_
  
  - [ ]* 14.7 Write property test for tablet grid
    - **Property 25: Tablet Grid Layout**
    - **Validates: Requirements 5.6**

- [ ] 15. Implement accessibility features
  - [ ] 15.1 Add keyboard navigation support
    - Ensure all interactive elements are focusable with Tab/Shift+Tab
    - Add visible focus indicators with accent color
    - _Requirements: 6.1, 6.2_
  
  - [ ]* 15.2 Write property test for keyboard focus
    - **Property 26: Keyboard Focus Management**
    - **Validates: Requirements 6.1, 6.2**
  
  - [ ] 15.3 Add ARIA labels to icon buttons
    - Add aria-label or aria-labelledby to all icon-only buttons
    - _Requirements: 6.3_
  
  - [ ]* 15.4 Write property test for ARIA labels
    - **Property 27: Icon Button ARIA Labels**
    - **Validates: Requirements 6.3**
  
  - [ ] 15.5 Add arrow key navigation to table
    - Implement up/down arrow key handlers for row focus
    - Move focus to adjacent rows
    - _Requirements: 6.4_
  
  - [ ]* 15.6 Write property test for arrow key navigation
    - **Property 28: Table Arrow Key Navigation**
    - **Validates: Requirements 6.4**
  
  - [ ] 15.7 Add Enter key activation for table rows
    - Add Enter key handler to navigate to candidate profile
    - _Requirements: 6.5_
  
  - [ ]* 15.8 Write property test for Enter key activation
    - **Property 29: Enter Key Activation**
    - **Validates: Requirements 6.5**
  
  - [ ] 15.9 Add ARIA live regions
    - Add aria-live attributes to dynamic content areas
    - Configure politeness levels: assertive for errors, polite for updates
    - _Requirements: 6.6_
  
  - [ ]* 15.10 Write property test for ARIA live regions
    - **Property 30: ARIA Live Regions**
    - **Validates: Requirements 6.6**
  
  - [ ] 15.11 Implement focus trap in modals and drawers
    - Add focus trap to MobileDrawer when open
    - Restore focus to trigger element on close
    - _Requirements: 6.1_

- [ ] 16. Final checkpoint and polish
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with minimum 100 iterations
- All animations use transform and opacity for GPU acceleration
- Mobile-first responsive approach using Tailwind utilities
- Focus on accessibility throughout implementation
- Checkpoints ensure incremental validation and user feedback
