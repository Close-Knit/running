// src/components/PlanExplanation.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './PlanExplanation.css';

/**
 * Component to display explanatory text before and/or after a training plan
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.textBefore - Content to display before the plan
 * @param {React.ReactNode} props.textAfter - Content to display after the plan
 */
function PlanExplanation({ textBefore, textAfter }) {
  return (
    <div className="plan-explanation">
      {textBefore && <div className="explanation-before">{textBefore}</div>}
      {textAfter && <div className="explanation-after">{textAfter}</div>}
    </div>
  );
}

PlanExplanation.propTypes = {
  textBefore: PropTypes.node,
  textAfter: PropTypes.node
};

export default PlanExplanation;
