# Location Auto-Filter Race Condition Fix

## Problem Description

Users in Toronto (and other Canadian cities) were experiencing a race condition where:

1. **Page loads** → Location detection starts
2. **~1-2 seconds** → Location detection completes, detects Toronto/Canada
3. **Canadian events display** → Shows events near Toronto briefly
4. **~3 seconds** → Default USA filters kick in and override Canadian events
5. **USA events display** → Shows USA events instead of Canadian events

This created a jarring user experience where the correct events appeared momentarily before being replaced by incorrect events.

## Root Cause Analysis

The race condition occurred in `LocationSidebar.jsx` between two competing timing mechanisms:

### 1. Auto-Detected Location Filters (Fast)
- Triggered when `LocationContext` completes location detection
- Usually completes in 1-2 seconds
- Sets `autoFilters` with detected location (Toronto, Ontario, CAN)
- Calls `onFilterChange()` with Canadian filters

### 2. Default USA Filters (Slow)
- Triggered by `setTimeout()` after 3 seconds
- Designed as fallback for users without detectable location
- **Problem**: Was not checking if auto-filters had already been applied
- Would override auto-filters even after they were successfully applied

## Solution Implementation

### 1. Extended Default Filter Timeout
```javascript
// Before: 3 seconds
setTimeout(() => { /* apply default filters */ }, 3000);

// After: 5 seconds
setTimeout(() => { /* apply default filters */ }, 5000);
```

### 2. Fixed Closure Variable Issue
```javascript
// Before: Used closure variables that could be stale
setTimeout(() => {
  if (!autoFilters && !hasValidLocation() && !autoFiltersApplied) {
    // These values were captured at component mount, not current values
  }
}, 5000);

// After: Use ref to track current state
const filtersAppliedRef = useRef(false);
setTimeout(() => {
  if (!filtersAppliedRef.current) {
    // Check current state, not stale closure values
  }
}, 5000);
```

### 3. Enhanced Auto-Filter Protection
```javascript
// Auto-filters now mark themselves as applied immediately using both state and ref
if (autoFilters && !autoFiltersApplied && hasValidLocation()) {
  onFilterChange(autoFilters);
  filtersAppliedRef.current = true; // Immediate protection
  setAutoFiltersApplied(true); // State update for UI
}
```

### 4. Fixed useEffect Dependencies
```javascript
// Before: Included autoFiltersApplied in dependencies causing loops
}, [autoFilters, autoFiltersApplied, hasValidLocation]);

// After: Only depend on autoFilters to prevent loops
}, [autoFilters]);
```

### 5. Removed Cache Clearing
```javascript
// Before: Cleared location cache on every page load
clearLocationCache();

// After: Preserve cache for better performance
// Note: Location cache clearing removed to prevent interference
```

## Code Changes

### File: `src/components/LocationSidebar.jsx`

**Changes Made:**
1. Increased default filter timeout from 3 to 5 seconds
2. Added `autoFiltersApplied` check to default filter logic
3. Enhanced auto-filter application with immediate protection
4. Removed automatic location cache clearing
5. Added detailed logging for debugging

**Key Logic:**
- Auto-filters apply immediately when location detection completes
- Default filters only apply if auto-filters haven't been applied
- Once either filter type is applied, the other is prevented from overriding

## Expected Behavior After Fix

### For Toronto Users:
1. **Page loads** → Location detection starts
2. **~1-2 seconds** → Location detection completes, detects Toronto/Canada
3. **Canadian events display** → Shows events near Toronto
4. **~5 seconds** → Default filter timeout occurs but is skipped (auto-filters already applied)
5. **Canadian events remain** → No override, consistent experience

### For Users Without Detectable Location:
1. **Page loads** → Location detection starts
2. **~1-2 seconds** → Location detection fails or returns non-US/Canada location
3. **No events display** → Waiting for default filters
4. **~5 seconds** → Default USA filters apply
5. **USA events display** → Shows default USA events

### For Users Who Disable Location:
1. **Page loads** → Location detection disabled
2. **~5 seconds** → Default USA filters apply immediately
3. **USA events display** → Shows default USA events

## Testing Verification

To verify the fix works:

1. **Clear browser cache** to reset location preferences
2. **Load the homepage** from Toronto (or use VPN)
3. **Observe event loading**:
   - Should show Canadian events within 1-2 seconds
   - Should NOT switch to USA events after 5 seconds
   - Should maintain Canadian events consistently

## Performance Impact

- **Positive**: Removed unnecessary cache clearing on every page load
- **Neutral**: Increased default timeout by 2 seconds (only affects users without location)
- **Positive**: Reduced duplicate API calls from race condition

## Future Improvements

1. **Smarter timeout**: Could dynamically adjust based on location detection progress
2. **User feedback**: Could show loading indicator during location detection
3. **Preference memory**: Could remember user's preferred location for faster subsequent loads
