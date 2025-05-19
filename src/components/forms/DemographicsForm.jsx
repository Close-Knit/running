// src/components/forms/DemographicsForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

/**
 * Form component for collecting demographic information
 * 
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The demographics form component
 */
function DemographicsForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    biologicalSex: '',
    age: '',
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    heightFeet: '',
    heightInches: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert feet/inches to total inches if that unit is selected
    let dataToSave = {...formData};
    if (formData.heightUnit === 'in' && formData.heightFeet && formData.heightInches) {
      dataToSave.height = (parseInt(formData.heightFeet) * 12 + parseInt(formData.heightInches || 0)).toString();
    }
    
    onSave(dataToSave);
  };

  return (
    <div className="form-container">
      <h2>{title || 'Demographics'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="biologicalSex">Biological Sex:</label>
          <select 
            id="biologicalSex" 
            name="biologicalSex" 
            value={formData.biologicalSex} 
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other/Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            min="1" 
            max="120" 
            value={formData.age} 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <div className="input-with-unit">
            <input 
              type="number" 
              id="weight" 
              name="weight" 
              min="1" 
              max="500" 
              value={formData.weight} 
              onChange={handleChange}
              required
            />
            <select 
              name="weightUnit" 
              value={formData.weightUnit} 
              onChange={handleChange}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="height">Height:</label>
          <div className="input-with-unit">
            {formData.heightUnit === 'cm' ? (
              <input 
                type="number" 
                id="height" 
                name="height" 
                min="1" 
                max="300" 
                value={formData.height} 
                onChange={handleChange}
                required
              />
            ) : (
              <div className="feet-inches-container">
                <select
                  id="heightFeet"
                  name="heightFeet"
                  value={formData.heightFeet}
                  onChange={handleChange}
                  required
                >
                  <option value="">ft</option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select
                  id="heightInches"
                  name="heightInches"
                  value={formData.heightInches}
                  onChange={handleChange}
                  required
                >
                  <option value="">in</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            )}
            <select 
              name="heightUnit" 
              value={formData.heightUnit} 
              onChange={handleChange}
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
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

export default DemographicsForm;
