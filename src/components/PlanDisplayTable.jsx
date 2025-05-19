// src/components/PlanDisplayTable.jsx
import React from 'react';
import './PlanDisplayTable.css';

/**
 * Component to display a running plan's weekly schedule in a table format
 * 
 * @param {Object} props - Component props
 * @param {Array} props.weeklySchedule - Array of weekly schedule objects
 * @returns {JSX.Element} The plan display table component
 */
function PlanDisplayTable({ weeklySchedule }) {
  if (!weeklySchedule || weeklySchedule.length === 0) {
    return <p>No schedule data available.</p>;
  }

  return (
    <div className="schedule-table">
      <div className="schedule-header">
        <div className="schedule-cell">Week</div>
        <div className="schedule-cell">Monday</div>
        <div className="schedule-cell">Tuesday</div>
        <div className="schedule-cell">Wednesday</div>
        <div className="schedule-cell">Thursday</div>
        <div className="schedule-cell">Friday</div>
        <div className="schedule-cell">Saturday</div>
        <div className="schedule-cell">Sunday</div>
      </div>
      
      {weeklySchedule.map((week) => (
        <div key={week.week} className="schedule-row">
          <div className="schedule-cell">{week.week}</div>
          <div className="schedule-cell">{week.Monday}</div>
          <div className="schedule-cell">{week.Tuesday}</div>
          <div className="schedule-cell">{week.Wednesday}</div>
          <div className="schedule-cell">{week.Thursday}</div>
          <div className="schedule-cell">{week.Friday}</div>
          <div className="schedule-cell">{week.Saturday}</div>
          <div className="schedule-cell">{week.Sunday}</div>
        </div>
      ))}
    </div>
  );
}

export default PlanDisplayTable;
