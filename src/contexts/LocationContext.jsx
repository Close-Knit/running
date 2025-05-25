// src/contexts/LocationContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectUserLocation, clearLocationCache } from '../services/locationService';
import { supabase } from '../supabaseClient';

// Create the context
const LocationContext = createContext();

// Location preferences key for localStorage
const LOCATION_PREFERENCES_KEY = 'altrun_location_preferences';

// Default preferences
const defaultPreferences = {
  autoDetectEnabled: true,
  hasBeenPrompted: false,
  lastPromptDate: null,
  manuallyDisabled: false
};

/**
 * LocationProvider component that manages location state and detection
 */
export const LocationProvider = ({ children }) => {
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationPermission, setLocationPermission] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [autoFilters, setAutoFilters] = useState(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCATION_PREFERENCES_KEY);
      if (saved) {
        const savedPrefs = JSON.parse(saved);
        setPreferences({ ...defaultPreferences, ...savedPrefs });
      }
    } catch (error) {
      console.error('LocationContext: Error loading preferences', error);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCATION_PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('LocationContext: Error saving preferences', error);
    }
  }, [preferences]);

  // Auto-detect location on mount if enabled
  useEffect(() => {
    if (preferences.autoDetectEnabled && !preferences.manuallyDisabled) {
      detectLocation();
    }
  }, [preferences.autoDetectEnabled]);

  // Update auto-filters when location changes
  useEffect(() => {
    if (detectedLocation && hasValidLocation()) {
      // Get current date for default filters
      const today = new Date();
      const currentMonth = String(today.getMonth() + 1);
      const currentDay = String(today.getDate());

      setAutoFilters({
        country: detectedLocation.country,
        state: detectedLocation.state,
        city: detectedLocation.city,
        month: currentMonth,
        day: currentDay,
        eventType: '' // Include empty event type for consistency
      });

      console.log('LocationContext: Created auto-filters with date:', {
        country: detectedLocation.country,
        state: detectedLocation.state,
        city: detectedLocation.city,
        month: currentMonth,
        day: currentDay
      });
    } else {
      setAutoFilters(null);
    }
  }, [detectedLocation]);

  /**
   * Detect user location
   */
  const detectLocation = async () => {
    if (isDetecting) return;

    setIsDetecting(true);
    try {
      console.log('LocationContext: Starting location detection');
      const location = await detectUserLocation(supabase);

      if (location) {
        setDetectedLocation(location);
        console.log('LocationContext: Location detected', location);
      } else {
        console.log('LocationContext: No location detected');
      }
    } catch (error) {
      console.error('LocationContext: Location detection failed', error);
    } finally {
      setIsDetecting(false);
    }
  };

  /**
   * Check if we have a valid location for auto-filtering
   */
  const hasValidLocation = () => {
    return detectedLocation &&
           detectedLocation.country &&
           detectedLocation.state &&
           ['USA', 'CAN'].includes(detectedLocation.country);
  };

  /**
   * Check if we should show location prompt to user
   */
  const shouldShowLocationPrompt = () => {
    // Don't show if already prompted recently (within 7 days)
    if (preferences.hasBeenPrompted && preferences.lastPromptDate) {
      const daysSincePrompt = (Date.now() - preferences.lastPromptDate) / (1000 * 60 * 60 * 24);
      if (daysSincePrompt < 7) {
        return false;
      }
    }

    // Don't show if location permission denied
    if (locationPermission === 'denied') {
      return false;
    }

    // Don't show if auto-detect is disabled
    if (!preferences.autoDetectEnabled) {
      return false;
    }

    // Don't show if we already have a location
    if (hasValidLocation()) {
      return false;
    }

    return true;
  };

  /**
   * Enable auto-detection
   */
  const enableAutoDetection = () => {
    updatePreferences({
      autoDetectEnabled: true,
      manuallyDisabled: false
    });
    detectLocation();
  };

  /**
   * Disable auto-detection
   */
  const disableAutoDetection = () => {
    updatePreferences({
      autoDetectEnabled: false,
      manuallyDisabled: true
    });
    setDetectedLocation(null);
    setAutoFilters(null);
  };

  /**
   * Update preferences
   */
  const updatePreferences = (newPrefs) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  /**
   * Clear location data and cache
   */
  const clearLocation = () => {
    setDetectedLocation(null);
    setAutoFilters(null);
    clearLocationCache();
  };

  const value = {
    // State
    detectedLocation,
    isDetecting,
    locationPermission,
    preferences,
    autoFilters,

    // Functions
    detectLocation,
    hasValidLocation,
    shouldShowLocationPrompt,
    enableAutoDetection,
    disableAutoDetection,
    updatePreferences,
    clearLocation,
    setLocationPermission
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

/**
 * Hook to use location context
 */
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export default LocationContext;
