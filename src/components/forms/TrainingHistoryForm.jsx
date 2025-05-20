// src/components/forms/TrainingHistoryForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

/**
 * Form component for collecting training history information
 *
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The training history form component
 */
function TrainingHistoryForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    currentWeeklyMileage: '',
    mileageUnit: 'mi',
    recentRaces: [{ distance: '', time: '' }],
    injuryHistory: ''
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

  const handleRaceChange = (index, field, value) => {
    const updatedRaces = [...formData.recentRaces];
    updatedRaces[index] = {
      ...updatedRaces[index],
      [field]: value
    };

    setFormData(prevData => ({
      ...prevData,
      recentRaces: updatedRaces
    }));
  };

  const addRace = () => {
    setFormData(prevData => ({
      ...prevData,
      recentRaces: [...prevData.recentRaces, { distance: '', time: '' }]
    }));
  };

  const removeRace = (index) => {
    if (formData.recentRaces.length > 1) {
      const updatedRaces = [...formData.recentRaces];
      updatedRaces.splice(index, 1);

      setFormData(prevData => ({
        ...prevData,
        recentRaces: updatedRaces
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="form-container">
      <h2>{title || 'Training History'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentWeeklyMileage">Current Weekly Mileage:</label>
          <div className="input-with-unit">
            <input
              type="number"
              id="currentWeeklyMileage"
              name="currentWeeklyMileage"
              min="0"
              max="500"
              value={formData.currentWeeklyMileage}
              onChange={handleChange}
              required
            />
            <select
              name="mileageUnit"
              value={formData.mileageUnit}
              onChange={handleChange}
            >
              <option value="mi">mi</option>
              <option value="km">km</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Recent Race Results (Optional):</label>
          {formData.recentRaces.map((race, index) => (
            <div key={index} className="race-entry">
              <div className="race-inputs">
                <input
                  type="text"
                  placeholder="Distance (e.g., 5K, 10K, Half Marathon)"
                  value={race.distance}
                  onChange={(e) => handleRaceChange(index, 'distance', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Time (e.g., 25:30, 1:45:20)"
                  value={race.time}
                  onChange={(e) => handleRaceChange(index, 'time', e.target.value)}
                />
              </div>
              <button
                type="button"
                className="remove-button"
                onClick={() => removeRace(index)}
                disabled={formData.recentRaces.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addRace}>
            Add Race
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="injuryHistory">Injury History (Optional):</label>
          <textarea
            id="injuryHistory"
            name="injuryHistory"
            value={formData.injuryHistory}
            onChange={handleChange}
            placeholder="Describe any recent or recurring injuries that might affect your training"
            rows="4"
          />
          <p className="form-note">
            <em>Note: While we collect injury history, this basic plan does not yet fully customize for specific injuries.
            Always listen to your body and consult a professional.</em>
          </p>
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

export default TrainingHistoryForm;
