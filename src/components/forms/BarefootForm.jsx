// src/components/forms/BarefootForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

/**
 * Form component for collecting barefoot/minimalist running information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The barefoot form component
 */
function BarefootForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    experienceLevel: '',
    transitionTarget: '',
    currentFootwear: '',
    surfaceAccess: []
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    
    setFormData(prevData => {
      if (checked) {
        return {
          ...prevData,
          surfaceAccess: [...prevData.surfaceAccess, value]
        };
      } else {
        return {
          ...prevData,
          surfaceAccess: prevData.surfaceAccess.filter(item => item !== value)
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const surfaces = ['Grass', 'Sand', 'Smooth Trails', 'Track', 'Asphalt', 'Concrete', 'Gravel'];

  return (
    <div className="form-container">
      <h2>{title || 'Barefoot/Minimalist Running'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="experienceLevel">Barefoot/Minimalist Experience Level:</label>
          <select 
            id="experienceLevel" 
            name="experienceLevel" 
            value={formData.experienceLevel} 
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="none">None (Complete Beginner)</option>
            <option value="minimal">Minimal (Tried a few times)</option>
            <option value="moderate">Moderate (Some regular practice)</option>
            <option value="experienced">Experienced (Regular barefoot/minimalist runner)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currentFootwear">Current Running Footwear:</label>
          <select 
            id="currentFootwear" 
            name="currentFootwear" 
            value={formData.currentFootwear} 
            onChange={handleChange}
            required
          >
            <option value="">Select Footwear Type</option>
            <option value="traditional">Traditional Cushioned Shoes</option>
            <option value="stability">Stability/Motion Control Shoes</option>
            <option value="transition">Transitional Low-Drop Shoes</option>
            <option value="minimal">Minimalist Shoes (Vibram, etc.)</option>
            <option value="barefoot">Barefoot (No shoes)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="transitionTarget">Transition Goal:</label>
          <select 
            id="transitionTarget" 
            name="transitionTarget" 
            value={formData.transitionTarget} 
            onChange={handleChange}
            required
          >
            <option value="">Select Transition Goal</option>
            <option value="partial">Partial (Some barefoot/minimalist training)</option>
            <option value="half">Half (50/50 mix with traditional shoes)</option>
            <option value="mostly">Mostly (Primary training method)</option>
            <option value="full">Full Transition (All barefoot/minimalist)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Available Training Surfaces:</label>
          <div className="checkbox-group">
            {surfaces.map(surface => (
              <div key={surface} className="checkbox-item">
                <input 
                  type="checkbox" 
                  id={`surface-${surface.toLowerCase()}`} 
                  value={surface} 
                  checked={formData.surfaceAccess.includes(surface)} 
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={`surface-${surface.toLowerCase()}`}>{surface}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-buttons">
          {onBack && (
            <button type="button" className="back-button" onClick={onBack}>
              Back
            </button>
          )}
          <button type="submit" className="next-button">
            Generate Plan
          </button>
        </div>
      </form>
    </div>
  );
}

export default BarefootForm;
