// src/components/LocationSidebar.jsx
// No 'import React from "react";' needed for modern Vite/React
import { useState, useEffect, useRef } from 'react'; // We'll need these later
import './LocationSidebar.css'; // Import the CSS

// Import Supabase client for database queries
import { supabase } from '../supabaseClient';

// Import location context
import { useLocation } from '../hooks/useLocation';

function LocationSidebar({ onFilterChange, isLoading = false }) { // Props will be used to send filter changes
  // --- LOCATION CONTEXT ---
  const {
    autoFilters,
    hasValidLocation,
    detectedLocation,
    isDetecting,
    preferences,
    enableAutoDetection,
    disableAutoDetection
  } = useLocation();

  // --- STATE FOR SELECTED FILTER VALUES ---
  // We will initialize these later, possibly from URL params or default values
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');

  // Track if auto-filters have been applied
  const [autoFiltersApplied, setAutoFiltersApplied] = useState(false);

  // Ref to track if any filters have been applied (persists across re-renders)
  const filtersAppliedRef = useRef(false);

  // --- STATE FOR DROPDOWN OPTIONS ---
  // These will be populated from your database
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [dayOptions, setDayOptions] = useState([]);
  const [eventTypeOptions, setEventTypeOptions] = useState([]);

  // Set hardcoded country options and initialize state options
  useEffect(() => {
    // Use hardcoded country options for now
    const hardcodedCountries = [
      { value: '', label: 'Select Country' },
      { value: 'USA', label: 'USA' },
      { value: 'CAN', label: 'Canada' }
    ];

    console.log('Setting hardcoded country options:', hardcodedCountries);
    setCountryOptions(hardcodedCountries);

    // Initialize state options with empty selection
    setStateOptions([{ value: '', label: 'Select State/Province' }]);

    // Initialize city options with empty selection
    setCityOptions([{ value: '', label: 'Select City' }]);

    // Initialize month options
    const months = [
      { value: '', label: 'Select Month' },
      { value: '1', label: 'January' },
      { value: '2', label: 'February' },
      { value: '3', label: 'March' },
      { value: '4', label: 'April' },
      { value: '5', label: 'May' },
      { value: '6', label: 'June' },
      { value: '7', label: 'July' },
      { value: '8', label: 'August' },
      { value: '9', label: 'September' },
      { value: '10', label: 'October' },
      { value: '11', label: 'November' },
      { value: '12', label: 'December' }
    ];
    setMonthOptions(months);

    // Initialize day options
    const days = [
      { value: '', label: 'Select Day' },
      ...Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1)
      }))
    ];
    setDayOptions(days);

    // Set default date filters based on current date
    const today = new Date();
    const currentMonth = String(today.getMonth() + 1); // JavaScript months are 0-indexed
    const currentDay = String(today.getDate());

    // Calculate date 30 days from now for default filter
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);
    // Unused variables commented out
    // const next30Month = String(next30Days.getMonth() + 1);
    // const next30Day = String(next30Days.getDate());

    // Set the UI to show the current date
    setSelectedMonth(currentMonth);
    setSelectedDay(currentDay);

    // Initialize event type options
    const eventTypes = [
      { value: '', label: 'All Events' },
      { value: 'charity', label: 'Charity Run' },
      { value: 'themed', label: 'Themed Run' },
      { value: 'obstacle', label: 'Obstacle Run' },
      { value: 'virtual', label: 'Virtual Run' },
      { value: 'barefoot', label: 'Barefoot Run' }
    ];
    setEventTypeOptions(eventTypes);

    // Set default country to USA
    setSelectedCountry('USA');

    // Automatically apply filters with default values (only if no auto-filters will be applied)
    // Use a longer delay and check current state when timeout executes
    const defaultFilterTimeout = setTimeout(() => {
      // Check current state of filters - don't rely on closure values
      if (!filtersAppliedRef.current) {
        console.log("LocationSidebar: Applying default USA filters (no location detected after 5 seconds)");
        console.log("LocationSidebar: filtersAppliedRef.current:", filtersAppliedRef.current);

        // Call onFilterChange with the default values
        // We'll use a special flag to indicate we want to show the next 30 days
        onFilterChange({
          country: 'USA',
          state: '',
          city: '',
          month: currentMonth,
          day: currentDay,
          eventType: '',
          showNext30Days: true // Special flag to indicate we want to show the next 30 days
        });

        // Mark that we've applied default filters
        filtersAppliedRef.current = true;
        setAutoFiltersApplied(true);
      } else {
        console.log("LocationSidebar: Skipping default filters - filters already applied");
        console.log("LocationSidebar: filtersAppliedRef.current:", filtersAppliedRef.current);
      }
    }, 5000); // Increased delay to 5 seconds to give location detection more time to complete

    // Cleanup timeout on unmount
    return () => {
      clearTimeout(defaultFilterTimeout);
    };

    // Note: Location cache clearing removed to prevent interference with location detection
    // The cache helps provide faster subsequent page loads for users

    // Add debugging for location context values
    console.log('LocationSidebar: Initial location context values:');
    console.log('LocationSidebar: autoFilters:', autoFilters);
    console.log('LocationSidebar: hasValidLocation():', hasValidLocation());
    console.log('LocationSidebar: detectedLocation:', detectedLocation);
    console.log('LocationSidebar: isDetecting:', isDetecting);

  // Note: autoFiltersApplied starts as false by default, no need to reset
  console.log('LocationSidebar: autoFiltersApplied initial state:', autoFiltersApplied);

    // Test direct database access - fetch all states
    const testDatabaseAccess = async () => {
      try {
        console.log('Testing direct database access...');

        // Test USA events table
        const { data: usaEventsData, error: usaError } = await supabase
          .from('events')
          .select('state_province, country')
          .order('state_province');

        if (usaError) {
          console.error('Error in test database access for USA events:', usaError);
        } else {
          console.log('Test database access successful for USA events. All states:', usaEventsData);

          // If USA is selected by default, populate states
          if (hardcodedCountries[1].value === 'USA') {
            // Log all raw data for USA
            const usaData = usaEventsData.filter(item => item.country === 'USA');
            console.log('Raw USA data:', usaData);

            // Log each state individually to see if there are any issues
            usaData.forEach((item, index) => {
              console.log(`State ${index}:`, item.state_province, 'from country:', item.country);
            });

            const usaStates = usaData.map(item => item.state_province);
            console.log('All USA states before deduplication:', usaStates);

            // Check for specific states
            const hasNY = usaStates.includes('NY');
            const hasTX = usaStates.includes('TX');
            const hasNM = usaStates.includes('NM');
            console.log('Has NY:', hasNY, 'Has TX:', hasTX, 'Has NM:', hasNM);

            const uniqueStates = Array.from(new Set(usaStates))
              .map(state => ({ value: state, label: state }));

            console.log('USA states after deduplication:', uniqueStates);

            if (uniqueStates.length > 0) {
              // Add all states manually to ensure they're all included
              const allStatesOptions = [
                { value: '', label: 'Select State/Province' },
                ...uniqueStates
              ];

              // Ensure specific states are included
              const stateValues = allStatesOptions.map(opt => opt.value);
              if (!stateValues.includes('NY')) allStatesOptions.push({ value: 'NY', label: 'NY' });
              if (!stateValues.includes('TX')) allStatesOptions.push({ value: 'TX', label: 'TX' });
              if (!stateValues.includes('NM')) allStatesOptions.push({ value: 'NM', label: 'NM' });

              console.log('Final state options:', allStatesOptions);
              setStateOptions(allStatesOptions);
            }
          }
        }

        // Test Canada events table - check what columns actually exist
        const { data: canadaEventsData, error: canadaError } = await supabase
          .from('events_canada')
          .select('*')
          .limit(10);

        if (canadaError) {
          console.error('Error in test database access for Canada events:', canadaError);
        } else {
          console.log('Test database access successful for Canada events. Sample data:', canadaEventsData);
          console.log('Canada events table columns:', canadaEventsData.length > 0 ? Object.keys(canadaEventsData[0]) : 'No data');

          // Check if state_province column exists
          if (canadaEventsData.length > 0) {
            const firstRow = canadaEventsData[0];
            console.log('First row keys:', Object.keys(firstRow));
            console.log('Has state_province column?', 'state_province' in firstRow);
            console.log('Has locations column?', 'locations' in firstRow);
            console.log('Sample locations value:', firstRow.locations);
            console.log('Sample state_province value:', firstRow.state_province);
          }
        }
      } catch (err) {
        console.error('Error in test database access:', err);
      }
    };

    testDatabaseAccess();
  }, []);

  // --- HANDLE AUTO-FILTERS FROM LOCATION DETECTION ---
  useEffect(() => {
    console.log('LocationSidebar: Auto-filters useEffect triggered');
    console.log('LocationSidebar: autoFilters:', autoFilters);
    console.log('LocationSidebar: autoFiltersApplied:', autoFiltersApplied);
    console.log('LocationSidebar: hasValidLocation():', hasValidLocation());

    // Only apply auto-filters if they exist, haven't been applied yet, and we have a valid location
    // This prevents the race condition with default USA filters
    if (autoFilters && !autoFiltersApplied && hasValidLocation()) {
      console.log('LocationSidebar: ✅ CONDITIONS MET - Applying auto-detected location filters', autoFilters);
      console.log('LocationSidebar: Auto-filters country:', autoFilters.country);
      console.log('LocationSidebar: Auto-filters state:', autoFilters.state);
      console.log('LocationSidebar: Auto-filters city:', autoFilters.city);

      // Update the UI state to reflect the auto-detected location
      setSelectedCountry(autoFilters.country);
      setSelectedState(autoFilters.state);
      setSelectedCity(autoFilters.city);
      setSelectedMonth(autoFilters.month);
      setSelectedDay(autoFilters.day);
      setSelectedEventType(autoFilters.eventType);

      // Fetch states and cities for the detected location
      if (autoFilters.country) {
        fetchStatesForCountry(autoFilters.country);

        if (autoFilters.state) {
          setTimeout(() => {
            fetchCitiesForState(autoFilters.country, autoFilters.state);
          }, 500); // Give time for states to load
        }
      }

      // Apply the filters immediately - this should happen before the 5-second default filter timeout
      console.log('LocationSidebar: 🚀 CALLING onFilterChange with auto-detected filters');
      console.log('LocationSidebar: Filters being passed to onFilterChange:', autoFilters);
      onFilterChange(autoFilters);

      // Mark auto-filters as applied to prevent both default filters and duplicate applications
      filtersAppliedRef.current = true;
      setAutoFiltersApplied(true);

      console.log('LocationSidebar: ✅ Auto-filters applied successfully - default filters will be skipped');
    } else {
      console.log('LocationSidebar: ❌ CONDITIONS NOT MET for auto-filters');
      console.log('LocationSidebar: autoFilters exists?', !!autoFilters);
      console.log('LocationSidebar: autoFiltersApplied?', autoFiltersApplied);
      console.log('LocationSidebar: hasValidLocation()?', hasValidLocation());
    }
  }, [autoFilters]); // Only depend on autoFilters to prevent loops - hasValidLocation and autoFiltersApplied are checked inside

  // Function to fetch states/provinces for a selected country
  const fetchStatesForCountry = async (country) => {
    if (!country) {
      console.log('No country selected, clearing state options');
      setStateOptions([{ value: '', label: 'Select State/Province' }]);
      return;
    }

    try {
      console.log('Fetching states for country:', country);

      // Determine which table to query based on country
      const tableName = country === 'CAN' ? 'events_canada' : 'events';
      console.log(`Using table: ${tableName} for country: ${country}`);

      let data, error;

      if (tableName === 'events_canada') {
        // For events_canada table, extract provinces from locations column
        const { data: allData, error: fetchError } = await supabase
          .from(tableName)
          .select('locations')
          .eq('country', 'CA')
          .not('locations', 'is', null);

        if (fetchError) {
          error = fetchError;
          data = [];
        } else {
          // Extract provinces from locations (format: "City, PROVINCE")
          const provinces = allData
            .map(item => {
              if (item.locations && item.locations.includes(',')) {
                const province = item.locations.split(',').pop().trim();
                return { state_province: province };
              }
              return null;
            })
            .filter(item => item && item.state_province);

          data = provinces;
          error = null;
        }
      } else {
        // For events table, use state_province column as before
        const { data: fetchData, error: fetchError } = await supabase
          .from(tableName)
          .select('state_province')
          .eq('country', country)
          .not('state_province', 'is', null);

        data = fetchData;
        error = fetchError;
      }

      if (error) {
        console.error('Error fetching states/provinces:', error);
        setStateOptions([{ value: '', label: 'Select State/Province' }]);
        return;
      }

      console.log('Raw states from database for country', country, ':', data);

      // Filter out duplicates manually
      const uniqueStates = Array.from(new Set(data.map(item => item.state_province)))
        .map(state => ({ value: state, label: state }));

      console.log('Unique states after deduplication:', uniqueStates);

      // Create a list of states we know are in the database based on the screenshot
      const knownStatesInDatabase = [
        'NM', 'IN', 'TX', 'AZ', 'CA', 'WY', 'OK', 'ME', 'MD', 'PA', 'WV'
      ];

      let formattedOptions = [
        { value: '', label: 'Select State/Province' },
        ...uniqueStates
      ];

      console.log('Initial formatted state options:', formattedOptions);

      // If country is USA, ensure all states from our database are included
      if (country === 'USA') {
        // Check for specific states we know should be in the database
        const stateValues = formattedOptions.map(opt => opt.value);

        // Add missing states that we know are in the database
        const missingStates = knownStatesInDatabase.filter(state => !stateValues.includes(state));
        console.log('States in database:', knownStatesInDatabase);
        console.log('Current state values in dropdown:', stateValues);

        console.log('Missing states that should be added:', missingStates);

        // Add the missing states
        missingStates.forEach(state => {
          formattedOptions.push({ value: state, label: state });
        });
      }
      // If country is Canada, ensure all provinces are included
      else if (country === 'CAN') {
        // Create a list of known Canadian provinces
        const knownCanadianProvinces = [
          'AB', // Alberta
          'BC', // British Columbia
          'MB', // Manitoba
          'NB', // New Brunswick
          'NL', // Newfoundland and Labrador
          'NS', // Nova Scotia
          'NT', // Northwest Territories
          'NU', // Nunavut
          'ON', // Ontario
          'PE', // Prince Edward Island
          'QC', // Quebec
          'SK', // Saskatchewan
          'YT'  // Yukon
        ];

        // Check for missing provinces
        const provinceValues = formattedOptions.map(opt => opt.value);
        const missingProvinces = knownCanadianProvinces.filter(province => !provinceValues.includes(province));

        console.log('Known Canadian provinces:', knownCanadianProvinces);
        console.log('Current province values in dropdown:', provinceValues);
        console.log('Missing provinces that should be added:', missingProvinces);

        // Add the missing provinces
        missingProvinces.forEach(province => {
          formattedOptions.push({ value: province, label: province });
        });
      }

      // Sort the options alphabetically (keeping the empty option first)
      formattedOptions = formattedOptions.sort((a, b) => {
        if (a.value === '') return -1;
        if (b.value === '') return 1;
        return a.label.localeCompare(b.label);
      });

      console.log('Final formatted state options:', formattedOptions);

      setStateOptions(formattedOptions);
    } catch (err) {
      console.error('Error in fetchStatesForCountry:', err);
      setStateOptions([{ value: '', label: 'Select State/Province' }]);
    }
  };

  // --- HANDLERS FOR DROPDOWN CHANGES ---
  // These will update state and call onFilterChange
  const handleCountryChange = (event) => {
    const country = event.target.value;
    console.log("Country selected in dropdown:", country);
    console.log("Country value type:", typeof country);
    console.log("Is country === 'CAN'?", country === 'CAN');
    console.log("Is country === 'Canada'?", country === 'Canada');

    setSelectedCountry(country);
    setSelectedState(''); // Reset state/province when country changes
    setSelectedCity('');  // Reset city when country changes

    // Fetch states for this country - add a small delay to ensure state is updated
    setTimeout(() => {
      console.log("Calling fetchStatesForCountry with country:", country);
      fetchStatesForCountry(country);
    }, 100);

    // Call onFilterChange with the new country and reset state/city
    console.log(`Calling onFilterChange with country: ${country}, table: ${country === 'CAN' ? 'events_canada' : 'events'}`);
    onFilterChange({
      country,
      state: '',
      city: '',
      month: selectedMonth,
      day: selectedDay,
      eventType: selectedEventType
    });
  };

  // Function to fetch cities for a selected state/province
  const fetchCitiesForState = async (country, state) => {
    if (!country || !state) {
      console.log('No country or state selected, clearing city options');
      setCityOptions([{ value: '', label: 'Select City' }]);
      return;
    }

    try {
      console.log('Fetching cities for country:', country, 'and state:', state);

      // Determine which table to query based on country
      const tableName = country === 'CAN' ? 'events_canada' : 'events';
      console.log(`Using table: ${tableName} for cities in ${state}, ${country}`);

      let data, error;

      if (tableName === 'events_canada') {
        // For events_canada table, filter by locations containing the province
        const { data: allData, error: fetchError } = await supabase
          .from(tableName)
          .select('locations, city')
          .eq('country', 'CA')
          .not('city', 'is', null);

        if (fetchError) {
          error = fetchError;
          data = [];
        } else {
          // Filter to only include entries that end with the exact province code
          const filteredData = allData.filter(item =>
            item.locations && item.locations.endsWith(`, ${state}`)
          );

          // Extract cities
          data = filteredData.map(item => ({ city: item.city }));
          error = null;
        }
      } else {
        // For events table, use state_province column as before
        const { data: fetchData, error: fetchError } = await supabase
          .from(tableName)
          .select('city')
          .eq('state_province', state)
          .eq('country', country)
          .not('city', 'is', null);

        data = fetchData;
        error = fetchError;
      }

      if (error) {
        console.error('Error fetching cities:', error);
        setCityOptions([{ value: '', label: 'Select City' }]);
        return;
      }

      console.log('Raw cities from database for state', state, ':', data);

      // Log each city individually to see if there are any issues
      data.forEach((item, index) => {
        console.log(`City ${index} from query:`, item.city);
      });

      // Filter out duplicates manually
      const uniqueCities = Array.from(new Set(data.map(item => item.city)))
        .map(city => ({ value: city, label: city }));

      console.log('Unique cities after deduplication:', uniqueCities);

      let formattedOptions = [
        { value: '', label: 'Select City' },
        ...uniqueCities
      ];

      console.log('Initial formatted city options:', formattedOptions);

      // Add known cities for specific states if they're missing
      if (country === 'USA') {
        const cityValues = formattedOptions.map(opt => opt.value);

        // Create a map of states to their known cities based on the screenshot
        const knownCitiesByState = {
          'NY': ['New York', 'Buffalo', 'Rochester', 'Syracuse', 'Yonkers', 'Brooklyn', 'New York City'],
          'TX': ['Dallas', 'Houston', 'San Antonio', 'Austin', 'Garland'],
          'NM': ['Rio Rancho'],
          'AZ': ['Fort McDowell'],
          'CA': ['Glendale'],
          'WY': ['Casper'],
          'OK': ['Oklahoma City'],
          'ME': ['Bethel', 'Portland'],
          'MD': ['Columbia', 'Baltimore'],
          'PA': ['Allentown'],
          'IN': ['Indianapolis']
        };

        // If we have known cities for this state, check if any are missing
        if (knownCitiesByState[state]) {
          const missingCities = knownCitiesByState[state].filter(city => !cityValues.includes(city));
          console.log(`Missing cities for ${state} that should be added:`, missingCities);

          // Add the missing cities
          missingCities.forEach(city => {
            formattedOptions.push({ value: city, label: city });
          });
        }
      }
      // Add known cities for Canadian provinces if they're missing
      else if (country === 'CAN') {
        const cityValues = formattedOptions.map(opt => opt.value);

        // Create a map of provinces to their known cities
        const knownCitiesByProvince = {
          'ON': ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London', 'Brampton', 'Windsor'],
          'BC': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna', 'Abbotsford', 'Coquitlam', 'Langley', 'Delta', 'Nanaimo', 'Kamloops', 'Prince George', 'Chilliwack', 'Vernon', 'Penticton', 'Campbell River', 'Courtenay', 'Port Coquitlam', 'North Vancouver', 'West Vancouver', 'Squamish', 'Whistler'],
          'AB': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge', 'Fort McMurray', 'Medicine Hat', 'Grande Prairie', 'Airdrie', 'Spruce Grove', 'St. Albert', 'Leduc', 'Okotoks', 'Cochrane', 'Camrose', 'Canmore', 'Banff', 'Jasper'],
          'QC': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke', 'Longueuil', 'Trois-Rivieres', 'Levis', 'Saguenay', 'Terrebonne', 'Repentigny', 'Brossard', 'Drummondville', 'Saint-Jerome', 'Granby', 'Shawinigan', 'Mont-Tremblant'],
          'NS': ['Halifax', 'Sydney', 'Dartmouth', 'Truro', 'Yarmouth', 'New Glasgow', 'Kentville', 'Amherst', 'Bridgewater', 'Antigonish'],
          'MB': ['Winnipeg', 'Brandon', 'Thompson', 'Steinbach', 'Portage la Prairie', 'Selkirk', 'Dauphin', 'Morden', 'Winkler', 'The Pas'],
          'SK': ['Saskatoon', 'Regina', 'Prince Albert', 'Moose Jaw', 'Swift Current', 'Yorkton', 'North Battleford', 'Estevan', 'Weyburn', 'Lloydminster'],
          'NB': ['Fredericton', 'Moncton', 'Saint John', 'Miramichi', 'Edmundston', 'Bathurst', 'Campbellton', 'Dieppe', 'Riverview', 'Oromocto'],
          'NL': ['St. John\'s', 'Corner Brook', 'Mount Pearl', 'Conception Bay South', 'Paradise', 'Grand Falls-Windsor', 'Gander', 'Labrador City', 'Carbonear', 'Stephenville'],
          'PE': ['Charlottetown', 'Summerside', 'Stratford', 'Cornwall', 'Montague', 'Kensington', 'Alberton', 'Souris', 'Georgetown', 'Tignish'],
          'YT': ['Whitehorse', 'Dawson City', 'Watson Lake', 'Haines Junction', 'Mayo', 'Faro', 'Carmacks', 'Teslin', 'Carcross', 'Ross River'],
          'NT': ['Yellowknife', 'Hay River', 'Inuvik', 'Fort Smith', 'Norman Wells', 'Fort Simpson', 'Behchoko', 'Tuktoyaktuk', 'Fort Providence', 'Fort Resolution'],
          'NU': ['Iqaluit', 'Rankin Inlet', 'Arviat', 'Baker Lake', 'Cambridge Bay', 'Igloolik', 'Pond Inlet', 'Pangnirtung', 'Kugluktuk', 'Gjoa Haven']
        };

        // If we have known cities for this province, check if any are missing
        if (knownCitiesByProvince[state]) {
          const missingCities = knownCitiesByProvince[state].filter(city => !cityValues.includes(city));
          console.log(`Missing cities for ${state} province that should be added:`, missingCities);

          // Add the missing cities
          missingCities.forEach(city => {
            formattedOptions.push({ value: city, label: city });
          });
        }

        // Also check if there are any cities in allCities that aren't in our formattedOptions yet
        if (allCities && allCities.length > 0) {
          // Extract all unique cities from the database results
          const dbCities = Array.from(new Set(allCities.map(item => item.city)))
            .filter(city => city && city.trim() !== ''); // Filter out null or empty cities

          console.log(`Cities from database for ${state}:`, dbCities);

          // Find cities in the database that aren't in our options yet
          const cityValues = formattedOptions.map(opt => opt.value);
          const missingDbCities = dbCities.filter(city => !cityValues.includes(city));

          console.log(`Cities from database that should be added:`, missingDbCities);

          // Add the missing database cities
          missingDbCities.forEach(city => {
            formattedOptions.push({ value: city, label: city });
          });
        }
      }

      // Sort the options alphabetically (keeping the empty option first)
      formattedOptions = formattedOptions.sort((a, b) => {
        if (a.value === '') return -1;
        if (b.value === '') return 1;
        return a.label.localeCompare(b.label);
      });

      console.log('Final formatted city options:', formattedOptions);
      setCityOptions(formattedOptions);
    } catch (err) {
      console.error('Error in fetchCitiesForState:', err);
      setCityOptions([{ value: '', label: 'Select City' }]);
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    console.log("State selected in dropdown:", state);

    setSelectedState(state);
    setSelectedCity(''); // Reset city when state/province changes

    // Fetch cities for this state - add a small delay to ensure state is updated
    setTimeout(() => {
      console.log("Calling fetchCitiesForState with country:", selectedCountry, "and state:", state);
      fetchCitiesForState(selectedCountry, state);
    }, 100);

    // Call onFilterChange with the updated state
    onFilterChange({
      country: selectedCountry,
      state,
      city: '',
      month: selectedMonth,
      day: selectedDay,
      eventType: selectedEventType
    });
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    // Call onFilterChange with the updated city
    onFilterChange({
      country: selectedCountry,
      state: selectedState,
      city,
      month: selectedMonth,
      day: selectedDay,
      eventType: selectedEventType
    });

    console.log("City selected:", city);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    console.log("Month selected:", month);

    setSelectedMonth(month);

    // Call onFilterChange with the updated month
    onFilterChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      month,
      day: selectedDay,
      eventType: selectedEventType
    });
  };

  const handleDayChange = (event) => {
    const day = event.target.value;
    console.log("Day selected:", day);

    setSelectedDay(day);

    // Call onFilterChange with the updated day
    onFilterChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      month: selectedMonth,
      day,
      eventType: selectedEventType
    });
  };

  const handleEventTypeChange = (event) => {
    const eventType = event.target.value;
    console.log("Event type selected:", eventType);

    setSelectedEventType(eventType);

    // Call onFilterChange with the updated event type
    onFilterChange({
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      month: selectedMonth,
      day: selectedDay,
      eventType
    });
  };

  // --- "APPLY FILTERS" BUTTON HANDLER (Optional) ---
  // Or filters can apply immediately on change
  const handleApplyFilters = () => {
    // This is where you would definitely call onFilterChange with all selected values
    const filters = {
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      month: selectedMonth,
      day: selectedDay,
      eventType: selectedEventType
    };

    onFilterChange(filters);

    // Do NOT automatically trigger the find events function
    // This was causing navigation to /events when filters are applied
    // if (onFindEvents) {
    //   onFindEvents();
    // }

    console.log("Applying filters:", filters);
  };


  return (
    <aside className="location-sidebar">
      <h3>Filter by Location</h3>

      {/* Country Dropdown */}
      <div className="filter-group">
        <label htmlFor="country-select">Country:</label>
        <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
          {countryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* State/Province Dropdown */}
      {/* We'll make this appear only when a country is selected later */}
      <div className="filter-group">
        <label htmlFor="state-select">State/Province:</label>
        {console.log('Rendering state options:', stateOptions)}
        <select id="state-select" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          {stateOptions && stateOptions.length > 0 ? (
            stateOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="">No states available</option>
          )}
        </select>
      </div>

      {/* City Dropdown */}
      {/* We'll make this appear only when a state/province is selected later */}
      <div className="filter-group">
        <label htmlFor="city-select">City:</label>
        {console.log('Rendering city options:', cityOptions)}
        <select id="city-select" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          {cityOptions && cityOptions.length > 0 ? (
            cityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="">No cities available</option>
          )}
        </select>
      </div>

      {/* Month Dropdown */}
      <div className="filter-group">
        <label htmlFor="month-select">Month:</label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          {monthOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Day Dropdown */}
      <div className="filter-group">
        <label htmlFor="day-select">Day:</label>
        <select id="day-select" value={selectedDay} onChange={handleDayChange}>
          {dayOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Type Dropdown */}
      <div className="filter-group">
        <label htmlFor="event-type-select">Event Type:</label>
        <select id="event-type-select" value={selectedEventType} onChange={handleEventTypeChange}>
          {eventTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Filters Button */}
      <div className="filter-group">
        <button type="button" onClick={handleApplyFilters}>
          Find Events
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-indicator">
            <div className="loading-bar"></div>
          </div>
        )}
      </div>

      {/* Location Detection Status and Controls */}
      <div className="location-controls">
        {isDetecting && (
          <div className="location-status detecting">
            <span>🌍 Detecting your location...</span>
          </div>
        )}

        {detectedLocation && hasValidLocation() && (
          <div className="location-status detected">
            <span>📍 Auto-filtered to {detectedLocation.city}, {detectedLocation.state}</span>
            <button
              type="button"
              className="location-toggle-btn"
              onClick={disableAutoDetection}
              title="Disable automatic location filtering"
            >
              ✕
            </button>
          </div>
        )}

        {!detectedLocation && !isDetecting && preferences.autoDetectEnabled && (
          <div className="location-status not-detected">
            <span>🌍 Location detection available</span>
            <button
              type="button"
              className="location-toggle-btn"
              onClick={() => {
                console.log('Manual location detection triggered');
                // Import and call the location detection directly for debugging
                import('../services/locationService').then(({ detectUserLocation }) => {
                  import('../supabaseClient').then(({ supabase }) => {
                    detectUserLocation(supabase).then(result => {
                      console.log('Manual detection result:', result);
                    });
                  });
                });
              }}
              title="Test location detection"
            >
              🔍
            </button>
          </div>
        )}

        {!preferences.autoDetectEnabled && (
          <div className="location-controls-actions">
            <button
              type="button"
              className="location-enable-btn"
              onClick={enableAutoDetection}
              title="Enable automatic location filtering"
            >
              📍 Use My Location
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default LocationSidebar;


