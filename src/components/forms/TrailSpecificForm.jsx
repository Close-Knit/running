// src/components/forms/TrailSpecificForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

/**
 * Form component for collecting trail-specific information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The trail-specific form component
 */
function TrailSpecificForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    raceElevationGain: '',
    elevationUnit: 'm',
    hasHillAccess: false,
    hasTreadmillAccess: false,
    terrainType: []
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
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    setFormData(prevData => {
      if (checked) {
        return {
          ...prevData,
          terrainType: [...prevData.terrainType, value]
        };
      } else {
        return {
          ...prevData,
          terrainType: prevData.terrainType.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const terrainTypes = ['Technical Single Track', 'Fire Roads', 'Rocky Terrain', 'Muddy Conditions', 'Sandy Terrain', 'Forest Trails', 'Mountain Terrain', 'Desert Terrain'];

  return (
    <div className="form-container">
      <h2>{title || 'Trail Specifics'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="raceElevationGain">Race Elevation Gain (if known):</label>
          <div className="input-with-unit">
            <input 
              type="number" 
              id="raceElevationGain" 
              name="raceElevationGain" 
              min="0" 
              value={formData.raceElevationGain} 
              onChange={handleChange}
              placeholder="Leave blank if unknown"
            />
            <select 
              name="elevationUnit" 
              value={formData.elevationUnit} 
              onChange={handleChange}
            >
              <option value="m">meters</option>
              <option value="ft">feet</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Expected Terrain Types:</label>
          <div className="checkbox-group">
            {terrainTypes.map(terrain => (
              <div key={terrain} className="checkbox-item">
                <input 
                  type="checkbox" 
                  id={`terrain-${terrain.replace(/\s+/g, '-').toLowerCase()}`} 
                  value={terrain} 
                  checked={formData.terrainType.includes(terrain)} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`terrain-${terrain.replace(/\s+/g, '-').toLowerCase()}`}>{terrain}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <div className="toggle-item">
            <input 
              type="checkbox" 
              id="hasHillAccess" 
              name="hasHillAccess" 
              checked={formData.hasHillAccess} 
              onChange={handleChange}
            />
            <label htmlFor="hasHillAccess">I have access to hills for training</label>
          </div>
        </div>

        <div className="form-group">
          <div className="toggle-item">
            <input 
              type="checkbox" 
              id="hasTreadmillAccess" 
              name="hasTreadmillAccess" 
              checked={formData.hasTreadmillAccess} 
              onChange={handleChange}
            />
            <label htmlFor="hasTreadmillAccess">I have access to an incline treadmill</label>
          </div>
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

export default TrailSpecificForm;
