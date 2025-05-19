// src/pages/RunningPlansPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import DemographicsForm from '../components/forms/DemographicsForm';
import TrainingHistoryForm from '../components/forms/TrainingHistoryForm';
import GoalConfigForm from '../components/forms/GoalConfigForm';
import LifestyleForm from '../components/forms/LifestyleForm';
import TrailSpecificForm from '../components/forms/TrailSpecificForm';
import BarefootForm from '../components/forms/BarefootForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import SEO from '../components/SEO';
import { generateRunningPlan } from '../logic/planGenerator';
import './RunningPlansPage.css';

/**
 * Running Plans Page component
 * Manages the multi-step form process for generating a custom running plan
 *
 * @returns {JSX.Element} The running plans page component
 */
function RunningPlansPage() {
  const [formData, setFormData] = useState({
    demographics: { biologicalSex: '', age: '', weight: '', weightUnit: 'kg', height: '', heightUnit: 'cm' },
    trainingHistory: { currentWeeklyMileage: '', mileageUnit: 'km', recentRaces: [{distance: '', time: ''}], injuryHistory: '' },
    goalConfig: { raceType: '', raceDistanceCustom: '', targetDate: '', optimizationFocus: '' },
    lifestyle: { availableDays: [], preferredWorkouts: [], equipmentAccess: [], interestedInBarefoot: false },
    trailSpecific: { raceElevationGain: '', elevationUnit: 'm', hasHillAccess: false, hasTreadmillAccess: false, terrainType: [] },
    barefoot: { experienceLevel: '', transitionTarget: '', currentFootwear: '', surfaceAccess: [] }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateFormData = (formName, data) => {
    setFormData(prev => ({ ...prev, [formName]: data }));
  };

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    console.log('All form data collected:', formData);

    // Generate the running plan using the planGenerator
    const generatedPlan = generateRunningPlan(formData);

    // Check if there was an error in plan generation
    if (generatedPlan.error) {
      console.error('Error generating plan:', generatedPlan.error);
      alert('Error generating plan: ' + generatedPlan.error);
      setIsLoading(false);
      return;
    }

    console.log('Generated Plan:', generatedPlan);

    try {
      const { data: newPlan, error } = await supabase
        .from('running_plans')
        .insert([{ plan_data: generatedPlan, plan_type: 'freemium' }])
        .select('id')
        .single();

      if (error) throw error;

      if (newPlan && newPlan.id) {
        navigate(`/plan/${newPlan.id}`); // Assumes PlanPage is routed at /plan/:planId
      } else {
        throw new Error('No ID returned from Supabase after insert.');
      }
    } catch (e) {
      console.error('Error saving plan to Supabase:', e);
      alert('Error saving plan: ' + (e.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  // Define the sequence of forms and their props
  const steps = [
    { name: 'demographics', Component: DemographicsForm, title: 'Step 1: Demographics' },
    { name: 'trainingHistory', Component: TrainingHistoryForm, title: 'Step 2: Training History' },
    { name: 'goalConfig', Component: GoalConfigForm, title: 'Step 3: Your Goal' },
    { name: 'lifestyle', Component: LifestyleForm, title: 'Step 4: Your Lifestyle' },
    // Conditionally add TrailSpecificForm if the race type includes 'Trail'
    {
      name: 'trailSpecific',
      Component: TrailSpecificForm,
      title: 'Step 5: Trail Specifics',
      condition: () => formData.goalConfig.raceType && formData.goalConfig.raceType.toLowerCase().includes('trail')
    },
    // Conditionally add BarefootForm if the user is interested in barefoot running
    {
      name: 'barefoot',
      Component: BarefootForm,
      title: 'Step 6: Barefoot/Minimalist Running',
      condition: () => formData.lifestyle.interestedInBarefoot
    },
  ];

  // Filter steps based on conditions
  const activeSteps = steps.filter(step => !step.condition || step.condition());
  const CurrentFormComponent = activeSteps[currentStep - 1]?.Component;

  // Define SEO data for the running plans page
  const seoData = {
    title: "Alt.Run: Custom Running Plan Generator",
    description: "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running plan generator.",
    canonicalUrl: "/running-plans",
    keywords: [
      "running plan generator", "custom training plan", "personalized running program",
      "marathon training", "5K training", "10K training", "trail running plan",
      "beginner running plan", "advanced running plan", "free running plan"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://alt.run/running-plans#webpage",
      "url": "https://alt.run/running-plans",
      "name": "Alt.Run: Custom Running Plan Generator",
      "description": "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running plan generator.",
      "isPartOf": { "@id": "https://alt.run/#website" }
    }
  };

  if (isLoading) return (
    <div className="running-plans-page">
      <SEO {...seoData} />
      <LoadingSpinner />
    </div>
  );

  // Set the background image for the running plans page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-plans.jpg)';
    }
  }, []);

  return (
    <div className="running-plans-page">
      <SEO {...seoData} />

      <div className="running-plans-header">
        <h1>Alt.Run Plan Generator</h1>
        <p>Create your personalized running plan in just a few steps</p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        {activeSteps.map((step, index) => (
          <React.Fragment key={step.name}>
            {index > 0 && (
              <div className={`step-line ${index < currentStep ? 'active' : ''}`}></div>
            )}
            <div className="progress-step">
              <div className={`step-number ${index + 1 <= currentStep ? 'active' : ''}`}>
                {index + 1}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {CurrentFormComponent ? (
        <CurrentFormComponent
          initialData={formData[activeSteps[currentStep - 1].name]}
          onSave={(data) => {
            updateFormData(activeSteps[currentStep - 1].name, data);
            if (currentStep < activeSteps.length) {
              handleNextStep();
            } else {
              handleGeneratePlan(); // Last step
            }
          }}
          onBack={currentStep > 1 ? handlePrevStep : undefined}
          title={activeSteps[currentStep - 1].title}
        />
      ) : (
        <div className="error-message">Error: Form step not found.</div>
      )}
    </div>
  );
}

export default RunningPlansPage;
