// src/components/forms/GoalConfigForm.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FormStyles.css';

/**
 * Form component for collecting goal configuration information
 *
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The goal configuration form component
 */
function GoalConfigForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    raceType: '',
    raceDistanceCustom: '',
    targetDate: '',
    optimizationFocus: ''
  });

  // Initialize form data from props when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle date change from DatePicker
  const handleDateChange = (date) => {
    // Format date as YYYY-MM-DD for consistency with the existing code
    const formattedDate = date ? date.toISOString().split('T')[0] : '';
    setFormData(prevData => ({
      ...prevData,
      targetDate: formattedDate
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Calculate minimum date (today) for the date picker
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Calculate maximum date (2 years from today) for the date picker
  const maxDate = new Date(today.setFullYear(today.getFullYear() + 2)).toISOString().split('T')[0];

  return (
    <div className="form-container">
      <h2>{title || 'Your Goal'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="raceType">Race Type:</label>
          <select
            id="raceType"
            name="raceType"
            value={formData.raceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Race Type</option>
            <optgroup label="Road Races">
              <option value="5K Road">5K Road</option>
              <option value="10K Road">10K Road</option>
              <option value="Half Marathon Road">Half Marathon Road</option>
              <option value="Marathon Road">Marathon Road</option>
              <option value="Custom Road">Custom Road Distance</option>
            </optgroup>
            <optgroup label="Trail Races">
              <option value="5K Trail">5K Trail</option>
              <option value="10K Trail">10K Trail</option>
              <option value="Half Marathon Trail">Half Marathon Trail</option>
              <option value="Marathon Trail">Marathon Trail</option>
              <option value="50K Trail">50K Trail</option>
              <option value="50 Mile Trail">50 Mile Trail</option>
              <option value="100K Trail">100K Trail</option>
              <option value="100 Mile Trail">100 Mile Trail</option>
              <option value="Custom Trail">Custom Trail Distance</option>
            </optgroup>
          </select>
        </div>

        {(formData.raceType === 'Custom Road' || formData.raceType === 'Custom Trail') && (
          <div className="form-group">
            <label htmlFor="raceDistanceCustom">Custom Race Distance:</label>
            <input
              type="text"
              id="raceDistanceCustom"
              name="raceDistanceCustom"
              value={formData.raceDistanceCustom}
              onChange={handleChange}
              placeholder="e.g., 15K, 30 miles, etc."
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="targetDate">Target Race Date:</label>
          <div className="datepicker-container">
            <DatePicker
              id="targetDate"
              selected={formData.targetDate ? new Date(formData.targetDate) : null}
              onChange={handleDateChange}
              minDate={new Date(minDate)}
              maxDate={new Date(maxDate)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              required
              className="datepicker-input"
              calendarClassName="datepicker-calendar"
              popperClassName="datepicker-popper"
              popperPlacement="bottom-start"
              showPopperArrow={false}
              isClearable={false}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              yearDropdownItemNumber={5}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="optimizationFocus">Training Focus:</label>
          <select
            id="optimizationFocus"
            name="optimizationFocus"
            value={formData.optimizationFocus}
            onChange={handleChange}
            required
          >
            <option value="">Select Focus</option>
            <option value="finish">Finish Strong (First-timer/Completion)</option>
            <option value="pr">Personal Record (Speed/Performance)</option>
            <option value="endurance">Endurance (Distance/Stamina)</option>
            <option value="balanced">Balanced (All-around Development)</option>
          </select>
        </div>

        <div className="form-buttons">
          {onBack && (
            <button type="button" className="back-button" onClick={onBack}>
              Back
            </button>
          )}
          <button type="submit" className="next-button">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default GoalConfigForm;
