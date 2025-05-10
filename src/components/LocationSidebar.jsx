// src/components/LocationSidebar.jsx
// No 'import React from "react";' needed for modern Vite/React
import { useState, useEffect } from 'react'; // We'll need these later
import './LocationSidebar.css'; // Import the CSS

// We will import supabase client later if fetching distinct locations directly here
// import { supabase } from '../supabaseClient';

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

  // --- MOCK OPTIONS FOR NOW (until we fetch from DB) ---
  useEffect(() => {
    // Replace these with actual fetching logic later
    setCountryOptions([
      { value: '', label: 'Select Country' },
      { value: 'USA', label: 'USA' },
      { value: 'CAN', label: 'Canada' }, // Example
    ]);
    // State and City options would typically be loaded based on country/state selection
  }, []);

  // --- HANDLERS FOR DROPDOWN CHANGES ---
  // These will update state and call onFilterChange
  const handleCountryChange = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setSelectedState(''); // Reset state/province when country changes
    setSelectedCity('');  // Reset city when country changes
    // TODO: Fetch states for this country
    // TODO: Call onFilterChange({ country, state: '', city: '' });
    console.log("Country selected:", country);
  };

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedCity(''); // Reset city when state/province changes
    // TODO: Fetch cities for this state
    // TODO: Call onFilterChange({ country: selectedCountry, state, city: '' });
    console.log("State selected:", state);
  };

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
    // TODO: Call onFilterChange({ country: selectedCountry, state: selectedState, city });
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
        <select id="state-select" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">Select State/Province</option>
          {/* Mocked for now, will be dynamic */}
          {selectedCountry === 'USA' && (
            <>
              <option value="CA">California</option>
              <option value="NY">New York</option>
            </>
          )}
          {selectedCountry === 'CAN' && (
            <>
              <option value="ON">Ontario</option>
              <option value="BC">British Columbia</option>
            </>
          )}
          {/* {stateOptions.map(option => (...))} Later */}
        </select>
      </div>

      {/* City Dropdown */}
      {/* We'll make this appear only when a state/province is selected later */}
      <div className="filter-group">
        <label htmlFor="city-select">City:</label>
        <select id="city-select" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {/* Mocked for now, will be dynamic */}
          {selectedState === 'CA' && selectedCountry === 'USA' && (
            <>
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
            </>
          )}
           {/* {cityOptions.map(option => (...))} Later */}
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
