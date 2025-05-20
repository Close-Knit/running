// src/components/forms/LifestyleForm.jsx
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

/**
 * Form component for collecting lifestyle information
 *
 * @param {Object} props - Component props
 * @param {Object} props.initialData - Initial form data
 * @param {Function} props.onSave - Function to call when form is submitted
 * @param {Function} props.onBack - Function to call when back button is clicked
 * @param {string} props.title - Form title
 * @returns {JSX.Element} The lifestyle form component
 */
function LifestyleForm({ initialData, onSave, onBack, title }) {
  const [formData, setFormData] = useState({
    availableDays: [],
    preferredWorkouts: [],
    equipmentAccess: [],
    interestedInBarefoot: false
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

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;

    // Special handling for "All Days" checkbox
    if (category === 'availableDays' && value === 'all') {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      setFormData(prevData => ({
        ...prevData,
        availableDays: checked ? weekdays : []
      }));
      return;
    }

    setFormData(prevData => {
      let updatedData;
      if (checked) {
        updatedData = {
          ...prevData,
          [category]: [...prevData[category], value]
        };
      } else {
        updatedData = {
          ...prevData,
          [category]: prevData[category].filter(item => item !== value)
        };
      }

      // Debug log to verify the data is being updated correctly
      console.log(`Updated ${category}:`, updatedData[category]);
      return updatedData;
    });
  };

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make sure we have at least one day selected
    if (formData.availableDays.length === 0) {
      // If no days are selected, default to all days
      const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const updatedFormData = {
        ...formData,
        availableDays: allDays
      };
      console.log('No days selected, defaulting to all days:', updatedFormData.availableDays);
      onSave(updatedFormData);
    } else {
      console.log('Submitting lifestyle form with days:', formData.availableDays);
      onSave(formData);
    }
  };

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const workoutTypes = ['Easy Runs', 'Long Runs', 'Speed Work', 'Hill Training', 'Cross Training', 'Strength Training'];
  const equipmentTypes = ['Treadmill', 'Gym Access', 'Resistance Bands', 'Weights', 'Heart Rate Monitor', 'GPS Watch'];

  return (
    <div className="form-container">
      <h2>{title || 'Your Lifestyle'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Available Days for Training:</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="day-all"
                value="all"
                checked={formData.availableDays.length === 7}
                onChange={(e) => handleCheckboxChange(e, 'availableDays')}
                name="availableDays"
              />
              <label htmlFor="day-all"><strong>All Days</strong></label>
            </div>
            {weekdays.map(day => (
              <div key={day} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  value={day}
                  checked={formData.availableDays.includes(day)}
                  onChange={(e) => handleCheckboxChange(e, 'availableDays')}
                  name="availableDays"
                />
                <label htmlFor={`day-${day}`}>{day}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Preferred Workout Types:</label>
          <div className="checkbox-group">
            {workoutTypes.map(workout => (
              <div key={workout} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`workout-${workout.replace(/\s+/g, '-').toLowerCase()}`}
                  value={workout}
                  checked={formData.preferredWorkouts.includes(workout)}
                  onChange={(e) => handleCheckboxChange(e, 'preferredWorkouts')}
                />
                <label htmlFor={`workout-${workout.replace(/\s+/g, '-').toLowerCase()}`}>{workout}</label>
              </div>
            ))}
          </div>
          <p className="form-note">
            <em>Note: Your preferred workout selections help us customize your training plan. We'll include more of your preferred workout types while still maintaining a balanced training approach.</em>
          </p>
        </div>

        <div className="form-group">
          <label>Equipment Access:</label>
          <div className="checkbox-group">
            {equipmentTypes.map(equipment => (
              <div key={equipment} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`equipment-${equipment.replace(/\s+/g, '-').toLowerCase()}`}
                  value={equipment}
                  checked={formData.equipmentAccess.includes(equipment)}
                  onChange={(e) => handleCheckboxChange(e, 'equipmentAccess')}
                />
                <label htmlFor={`equipment-${equipment.replace(/\s+/g, '-').toLowerCase()}`}>{equipment}</label>
              </div>
            ))}
          </div>
          <p className="form-note">
            <em>Note: Your equipment access helps us tailor workouts to what you have available. For example, if you have a treadmill, we can include specific treadmill workouts, or if you have weights, we'll incorporate strength training with weights.</em>
          </p>
        </div>

        <div className="form-group">
          <div className="toggle-item">
            <input
              type="checkbox"
              id="interestedInBarefoot"
              name="interestedInBarefoot"
              checked={formData.interestedInBarefoot}
              onChange={handleToggleChange}
            />
            <label htmlFor="interestedInBarefoot">Interested in barefoot/minimalist running?</label>
          </div>
          <p className="form-note">
            <em>Note: If selected, your plan will include a gradual transition to barefoot/minimalist running with specific exercises to strengthen your feet and lower legs. You'll also receive guidance on proper form and surface selection.</em>
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

export default LifestyleForm;
