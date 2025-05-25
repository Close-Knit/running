// src/services/locationService.js

/**
 * Location detection service for Alt.Run
 * Provides automatic location detection for US and Canadian visitors
 */

// Cache key for storing location data
const LOCATION_CACHE_KEY = 'altrun_user_location';
const LOCATION_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Get cached location data if it exists and is still valid
 */
const getCachedLocation = () => {
  try {
    const cached = localStorage.getItem(LOCATION_CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (within 24 hours)
    if (now - timestamp < LOCATION_CACHE_DURATION) {
      console.log('LocationService: Using cached location data', data);
      return data;
    } else {
      // Cache expired, remove it
      localStorage.removeItem(LOCATION_CACHE_KEY);
      return null;
    }
  } catch (error) {
    console.error('LocationService: Error reading cached location', error);
    localStorage.removeItem(LOCATION_CACHE_KEY);
    return null;
  }
};

/**
 * Cache location data
 */
const cacheLocation = (locationData) => {
  try {
    const cacheData = {
      data: locationData,
      timestamp: Date.now()
    };
    localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cacheData));
    console.log('LocationService: Cached location data', locationData);
  } catch (error) {
    console.error('LocationService: Error caching location', error);
  }
};

/**
 * Get location using browser's Geolocation API
 */
const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    const options = {
      enableHighAccuracy: false, // Don't need high accuracy for country/state detection
      timeout: 10000, // 10 seconds timeout
      maximumAge: 300000 // Accept cached position up to 5 minutes old
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('LocationService: Browser geolocation successful', position.coords);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        console.log('LocationService: Browser geolocation failed', error.message);
        reject(error);
      },
      options
    );
  });
};

/**
 * Get location using IP-based geolocation (fallback)
 * Using ipapi.co which provides free tier without API key
 */
const getIPLocation = async () => {
  try {
    console.log('LocationService: Attempting IP-based location detection');
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`IP location service responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('LocationService: IP location data received', data);
    console.log('LocationService: Raw country_code:', data.country_code);
    console.log('LocationService: Raw region:', data.region);
    console.log('LocationService: Raw city:', data.city);

    // Map country codes to our expected format
    let country = data.country_code?.toUpperCase();
    if (country === 'US') country = 'USA';
    if (country === 'CA') country = 'CAN'; // Map CA to CAN for dropdown consistency

    console.log('LocationService: Mapped country code from', data.country_code, 'to', country);

    // Map Canadian province names to codes (database likely uses codes)
    let region = data.region;
    if (country === 'CAN' && region) {
      const provinceMap = {
        'Alberta': 'AB',
        'British Columbia': 'BC',
        'Manitoba': 'MB',
        'New Brunswick': 'NB',
        'Newfoundland and Labrador': 'NL',
        'Northwest Territories': 'NT',
        'Nova Scotia': 'NS',
        'Nunavut': 'NU',
        'Ontario': 'ON',
        'Prince Edward Island': 'PE',
        'Quebec': 'QC',
        'Saskatchewan': 'SK',
        'Yukon': 'YT'
      };

      if (provinceMap[region]) {
        console.log('LocationService: Mapped province from', region, 'to', provinceMap[region]);
        region = provinceMap[region];
      }
    }

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      country: country,
      state: region, // Use the mapped region (province code for Canada)
      city: data.city,
      accuracy: 'city' // IP-based location is typically city-level accurate
    };
  } catch (error) {
    console.error('LocationService: IP location detection failed', error);
    throw error;
  }
};

/**
 * Reverse geocode coordinates to get address information
 * Using Nominatim (OpenStreetMap) which is free and doesn't require API key
 */
const reverseGeocode = async (latitude, longitude) => {
  try {
    console.log('LocationService: Reverse geocoding coordinates', { latitude, longitude });
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Alt.Run/1.0 (https://alt.run)' // Required by Nominatim
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('LocationService: Reverse geocoding successful', data);

    const address = data.address || {};

    // Map country codes to our expected format
    let country = address.country_code?.toUpperCase();
    if (country === 'US') country = 'USA';
    if (country === 'CA') country = 'CAN'; // Map CA to CAN for dropdown consistency

    // Map Canadian province names to codes (database likely uses codes)
    let state = address.state || address.province;
    if (country === 'CAN' && state) {
      const provinceMap = {
        'Alberta': 'AB',
        'British Columbia': 'BC',
        'Manitoba': 'MB',
        'New Brunswick': 'NB',
        'Newfoundland and Labrador': 'NL',
        'Northwest Territories': 'NT',
        'Nova Scotia': 'NS',
        'Nunavut': 'NU',
        'Ontario': 'ON',
        'Prince Edward Island': 'PE',
        'Quebec': 'QC',
        'Saskatchewan': 'SK',
        'Yukon': 'YT'
      };

      if (provinceMap[state]) {
        console.log('LocationService: Reverse geocoding mapped province from', state, 'to', provinceMap[state]);
        state = provinceMap[state];
      }
    }

    return {
      country,
      state,
      city: address.city || address.town || address.village,
      accuracy: 'precise'
    };
  } catch (error) {
    console.error('LocationService: Reverse geocoding failed', error);
    throw error;
  }
};

/**
 * Find the nearest city from our database for the detected location
 */
const findNearestCity = async (detectedLocation, supabase) => {
  try {
    console.log('LocationService: Finding nearest city for', detectedLocation);

    const { country, state } = detectedLocation;

    // Only proceed for USA and Canada
    if (!['USA', 'CAN'].includes(country)) {
      console.log('LocationService: Country not supported for auto-filtering', country);
      return null;
    }

    // Determine which table to query
    const tableName = country === 'CAN' ? 'events_canada' : 'events';
    console.log('LocationService: Using table', tableName, 'for country', country, 'and state/province', state);

    // Get all cities in the detected state/province
    let query = supabase
      .from(tableName)
      .select('city, state_province')
      .eq('state_province', state)
      .not('city', 'is', null);

    // For events table, also filter by country (but events_canada table uses 'CA' as country)
    if (tableName === 'events') {
      query = query.eq('country', country);
    } else {
      // For events_canada table, filter by country 'CA'
      query = query.eq('country', 'CA');
    }

    const { data: cities, error } = await query;

    if (error) {
      console.error('LocationService: Error fetching cities from database', error);
      return detectedLocation;
    }

    if (!cities || cities.length === 0) {
      console.log('LocationService: No cities found in database for', { country, state });
      return detectedLocation;
    }

    // Get unique cities
    const uniqueCities = [...new Set(cities.map(c => c.city))];
    console.log('LocationService: Found cities in database', uniqueCities);

    // For now, just return the detected location with the first available city
    // In a more sophisticated implementation, we could calculate distances
    const nearestCity = uniqueCities[0];

    return {
      ...detectedLocation,
      city: nearestCity,
      availableCities: uniqueCities
    };
  } catch (error) {
    console.error('LocationService: Error finding nearest city', error);
    return detectedLocation;
  }
};

/**
 * Main function to detect user location
 * Returns location data or null if detection fails or user is not from US/Canada
 */
export const detectUserLocation = async (supabase) => {
  try {
    console.log('LocationService: Starting location detection');

    // Check cache first
    const cachedLocation = getCachedLocation();
    if (cachedLocation) {
      return cachedLocation;
    }

    let locationData = null;

    try {
      // Try browser geolocation first
      const coords = await getBrowserLocation();
      const addressInfo = await reverseGeocode(coords.latitude, coords.longitude);
      locationData = { ...coords, ...addressInfo };
    } catch (browserError) {
      console.log('LocationService: Browser geolocation failed, trying IP fallback');

      try {
        // Fallback to IP-based location
        locationData = await getIPLocation();
      } catch (ipError) {
        console.log('LocationService: All location detection methods failed');
        return null;
      }
    }

    // Only proceed for US and Canada
    if (!['USA', 'CAN'].includes(locationData.country)) {
      console.log('LocationService: User not from US/Canada, skipping auto-filtering');
      return null;
    }

    // Find nearest city in our database
    const finalLocation = await findNearestCity(locationData, supabase);

    // Cache the result
    if (finalLocation) {
      cacheLocation(finalLocation);
    }

    console.log('LocationService: Location detection completed', finalLocation);
    return finalLocation;

  } catch (error) {
    console.error('LocationService: Location detection failed', error);
    return null;
  }
};

/**
 * Clear cached location data (useful for testing or user preference)
 */
export const clearLocationCache = () => {
  try {
    localStorage.removeItem(LOCATION_CACHE_KEY);
    console.log('LocationService: Location cache cleared');
  } catch (error) {
    console.error('LocationService: Error clearing location cache', error);
  }
};

/**
 * Check if user has previously denied location permission
 */
export const checkLocationPermission = async () => {
  if (!navigator.permissions) {
    return 'unknown';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    return permission.state; // 'granted', 'denied', or 'prompt'
  } catch (error) {
    console.error('LocationService: Error checking location permission', error);
    return 'unknown';
  }
};
