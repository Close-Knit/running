// src/components/TrainingPlanDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './TrainingPlanDisplay.css';

/**
 * Component to display a training plan in a structured format
 * 
 * @param {Object} props - Component props
 * @param {Object} props.planData - Training plan data with weeks and workouts
 */
function TrainingPlanDisplay({ planData }) {
  return (
    <div className="training-plan">
      <div className="training-plan-grid">
        <div className="training-plan-header">
          <div className="week-header">Week</div>
          <div className="workout-header">Workout (Do 3x per week)</div>
          <div className="total-time-header">Total Time</div>
        </div>
        
        {planData.weeks.map((week) => (
          <div key={week.week} className="training-plan-row">
            <div className="week-number">
              <span>{week.week}</span>
            </div>
            <div className="workout-description">
              <p>{week.workout}</p>
              {week.note && <p className="workout-note">{week.note}</p>}
            </div>
            <div className="total-time">
              <span>{week.totalTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

TrainingPlanDisplay.propTypes = {
  planData: PropTypes.shape({
    weeks: PropTypes.arrayOf(
      PropTypes.shape({
        week: PropTypes.number.isRequired,
        workout: PropTypes.string.isRequired,
        totalTime: PropTypes.string.isRequired,
        note: PropTypes.string
      })
    ).isRequired
  }).isRequired
};

export default TrainingPlanDisplay;
