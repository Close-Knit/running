// src/hooks/useLocation.js

import { useContext } from 'react';
import LocationContext from '../contexts/LocationContext.jsx';

/**
 * Custom hook to use location context
 * This is a convenience hook that provides easy access to location functionality
 */
export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }

  return context;
};

/**
 * Hook to get auto-filters for location-based filtering
 * Returns null if no location detected or user not from US/Canada
 */
export const useAutoFilters = () => {
  const { autoFilters, hasValidLocation } = useLocation();

  return hasValidLocation() ? autoFilters : null;
};

/**
 * Hook to check if location detection should be shown to user
 */
export const useLocationPrompt = () => {
  const {
    shouldShowLocationPrompt,
    preferences,
    detectLocation,
    updatePreferences,
    locationPermission
  } = useLocation();

  const showPrompt = () => {
    return shouldShowLocationPrompt() && locationPermission !== 'denied';
  };

  const acceptPrompt = () => {
    updatePreferences({ hasBeenPrompted: true, lastPromptDate: Date.now() });
    detectLocation();
  };

  const declinePrompt = () => {
    updatePreferences({
      hasBeenPrompted: true,
      lastPromptDate: Date.now(),
      autoDetectEnabled: false
    });
  };

  return {
    showPrompt: showPrompt(),
    acceptPrompt,
    declinePrompt,
    preferences
  };
};

export default useLocation;
