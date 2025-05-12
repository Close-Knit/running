// src/components/LocationSidebar.jsx
// No 'import React from "react";' needed for modern Vite/React
import { useState, useEffect } from 'react'; // We'll need these later
import './LocationSidebar.css'; // Import the CSS

// Import Supabase client for database queries
import { supabase } from '../supabaseClient';

function LocationSidebar({ onFilterChange, onFindEvents }) { // Props will be used to send filter changes and trigger find events
  // --- STATE FOR SELECTED FILTER VALUES ---
  // We will initialize these later, possibly from URL params or default values
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // --- STATE FOR DROPDOWN OPTIONS ---
  // These will be populated from your database
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

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

    // Test direct database access - fetch all states
    const testDatabaseAccess = async () => {
      try {
        console.log('Testing direct database access...');
        const { data, error } = await supabase
          .from('events')
          .select('state_province, country')
          .order('state_province');

        if (error) {
          console.error('Error in test database access:', error);
        } else {
          console.log('Test database access successful. All states:', data);

          // If USA is selected by default, populate states
          if (hardcodedCountries[1].value === 'USA') {
            const usaStates = data
              .filter(item => item.country === 'USA')
              .map(item => item.state_province);

            const uniqueStates = Array.from(new Set(usaStates))
              .map(state => ({ value: state, label: state }));

            console.log('USA states from test:', uniqueStates);

            if (uniqueStates.length > 0) {
              setStateOptions([
                { value: '', label: 'Select State/Province' },
                ...uniqueStates
              ]);
            }
          }
        }
      } catch (err) {
        console.error('Error in test database access:', err);
      }
    };

    testDatabaseAccess();
  }, []);

  // Function to fetch states/provinces for a selected country
  const fetchStatesForCountry = async (country) => {
    if (!country) {
      console.log('No country selected, clearing state options');
      setStateOptions([{ value: '', label: 'Select State/Province' }]);
      return;
    }

    try {
      console.log('Fetching states for country:', country);

      // For debugging, let's try a direct query to see all state_province values
      const { data: allStates, error: allStatesError } = await supabase
        .from('events')
        .select('state_province, country');

      console.log('All states in database:', allStates);

      if (allStatesError) {
        console.error('Error fetching all states:', allStatesError);
      }

      // Fetch all states/provinces from the database for the selected country
      const { data, error } = await supabase
        .from('events')
        .select('state_province')
        .eq('country', country)
        .not('state_province', 'is', null)
        .order('state_province');

      // Note: Removed distinctOn as it might be causing issues

      if (error) {
        console.error('Error fetching states/provinces:', error);
        setStateOptions([{ value: '', label: 'Select State/Province' }]);
        return;
      }

      console.log('Raw states from database for country', country, ':', data);

      // Filter out duplicates manually
      const uniqueStates = Array.from(new Set(data.map(item => item.state_province)))
        .map(state => ({ value: state, label: state }));

      const formattedOptions = [
        { value: '', label: 'Select State/Province' },
        ...uniqueStates
      ];

      console.log('Formatted state options:', formattedOptions);

      // Hardcode some states for testing
      if (formattedOptions.length <= 1) {
        console.log('No states found in database, adding hardcoded states for testing');
        if (country === 'USA') {
          formattedOptions.push(
            { value: 'TX', label: 'TX' },
            { value: 'CA', label: 'CA' },
            { value: 'NY', label: 'NY' }
          );
        }
      }

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

    setSelectedCountry(country);
    setSelectedState(''); // Reset state/province when country changes
    setSelectedCity('');  // Reset city when country changes

    // Fetch states for this country - add a small delay to ensure state is updated
    setTimeout(() => {
      console.log("Calling fetchStatesForCountry with country:", country);
      fetchStatesForCountry(country);
    }, 100);

    // Call onFilterChange with the new country and reset state/city
    onFilterChange({ country, state: '', city: '' });
  };

  // Function to fetch cities for a selected state/province
  const fetchCitiesForState = async (country, state) => {
    if (!country || !state) {
      setCityOptions([]);
      return;
    }

    try {
      console.log('Fetching cities for country:', country, 'and state:', state);

      // Fetch all cities from the database for the selected state
      const { data, error } = await supabase
        .from('events')
        .select('city')
        .eq('country', country)
        .eq('state_province', state)
        .not('city', 'is', null)
        .order('city')
        .distinctOn('city');

      if (error) {
        console.error('Error fetching cities:', error);
        setCityOptions([{ value: '', label: 'Select City' }]);
        return;
      }

      console.log('Cities from database for state', state, ':', data);

      const formattedOptions = [
        { value: '', label: 'Select City' },
        ...data.map(item => ({
          value: item.city,
          label: item.city
        }))
      ];

      console.log('Formatted city options:', formattedOptions);
      setCityOptions(formattedOptions);
    } catch (err) {
      console.error('Error in fetchCitiesForState:', err);
      setCityOptions([{ value: '', label: 'Select City' }]);
    }
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity(''); // Reset city when state/province changes

    // Fetch cities for this state
    fetchCitiesForState(selectedCountry, state);

    // Call onFilterChange with the updated state
    onFilterChange({
      country: selectedCountry,
      state,
      city: ''
    });

    console.log("State selected:", state);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);

    // Call onFilterChange with the updated city
    onFilterChange({
      country: selectedCountry,
      state: selectedState,
      city
    });

    console.log("City selected:", city);
  };

  // --- "APPLY FILTERS" BUTTON HANDLER (Optional) ---
  // Or filters can apply immediately on change
  const handleApplyFilters = () => {
    // This is where you would definitely call onFilterChange with all selected values
    const filters = {
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    };

    onFilterChange(filters);

    // Also trigger the find events function if provided
    if (onFindEvents) {
      onFindEvents();
    }

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

      {/* Apply Filters Button */}
      <div className="filter-group">
        <button type="button" onClick={handleApplyFilters}>
          Find Events
        </button>
      </div>

      {/* TODO: "Use my current location" button */}
      {/* TODO: "Clear filters" button */}
    </aside>
  );
}

export default LocationSidebar;
