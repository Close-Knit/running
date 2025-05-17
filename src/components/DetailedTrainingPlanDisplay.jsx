// src/components/DetailedTrainingPlanDisplay.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './DetailedTrainingPlanDisplay.css';

/**
 * Component to display a detailed training plan in a structured tabular format
 * with multiple columns for day, workout focus, details, duration, and intensity
 * 
 * @param {Object} props - Component props
 * @param {Object} props.planData - Training plan data with phases, weeks, and daily workouts
 * @param {string} props.title - Title of the training plan
 * @param {string} props.goal - Goal of the training plan
 * @param {string} props.targetAudience - Target audience description
 * @param {string} props.prerequisites - Prerequisites for following the plan
 */
function DetailedTrainingPlanDisplay({ 
  planData, 
  title, 
  goal, 
  targetAudience, 
  prerequisites 
}) {
  return (
    <div className="detailed-training-plan">
      <div className="plan-header">
        <h4>{title}</h4>
        <p><strong>Goal:</strong> {goal}</p>
        <p><strong>Target Audience:</strong> {targetAudience}</p>
        <p><strong>Prerequisites:</strong> {prerequisites}</p>
      </div>

      {planData.phases.map((phase, phaseIndex) => (
        <div key={`phase-${phaseIndex}`} className="training-phase-container">
          <div className="phase-header">
            <h4>{phase.name}</h4>
            <p>{phase.description}</p>
          </div>

          <div className="detailed-plan-table-container">
            <table className="detailed-plan-table">
              <thead>
                <tr>
                  <th className="day-column">Day</th>
                  <th className="workout-focus-column">Workout Focus</th>
                  <th className="workout-details-column">Specific Workout Details</th>
                  <th className="duration-column">Target Duration/Distance</th>
                  <th className="intensity-column">Key Intensity Notes</th>
                </tr>
              </thead>
              <tbody>
                {phase.weeks.map((week, weekIndex) => (
                  <React.Fragment key={`week-${phaseIndex}-${weekIndex}`}>
                    {/* Week header row */}
                    <tr className="week-header-row">
                      <td colSpan="5">Week {week.weekNumber}{week.subtitle && ` - ${week.subtitle}`}</td>
                    </tr>
                    
                    {/* Week days */}
                    {week.days.map((day, dayIndex) => (
                      <tr key={`day-${phaseIndex}-${weekIndex}-${dayIndex}`} className="day-row">
                        <td className="day-cell">{day.day}</td>
                        <td className="workout-focus-cell">{day.workoutFocus}</td>
                        <td className="workout-details-cell">{day.workoutDetails}</td>
                        <td className="duration-cell">{day.targetDuration}</td>
                        <td className="intensity-cell">{day.intensityNotes}</td>
                      </tr>
                    ))}
                    
                    {/* If there's a note for the entire week */}
                    {week.note && (
                      <tr className="week-note-row">
                        <td colSpan="5" className="week-note-cell">{week.note}</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                
                {/* If there's a note for the entire phase */}
                {phase.note && (
                  <tr className="phase-note-row">
                    <td colSpan="5" className="phase-note-cell">{phase.note}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

DetailedTrainingPlanDisplay.propTypes = {
  planData: PropTypes.shape({
    phases: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        note: PropTypes.string,
        weeks: PropTypes.arrayOf(
          PropTypes.shape({
            weekNumber: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            subtitle: PropTypes.string,
            note: PropTypes.string,
            days: PropTypes.arrayOf(
              PropTypes.shape({
                day: PropTypes.string.isRequired,
                workoutFocus: PropTypes.string.isRequired,
                workoutDetails: PropTypes.string.isRequired,
                targetDuration: PropTypes.string.isRequired,
                intensityNotes: PropTypes.string.isRequired
              })
            ).isRequired
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
  targetAudience: PropTypes.string.isRequired,
  prerequisites: PropTypes.string.isRequired
};

export default DetailedTrainingPlanDisplay;
