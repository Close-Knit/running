// src/pages/PlanGeneratorPage.jsx
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
import ShareButton from '../components/ShareButton';
import { generateRunningPlan } from '../logic/planGenerator';
import '../components/GuideHeader.css';
import '../components/ShareButton.css';
import './PlanGeneratorPage.css';

/**
 * Plan Generator Page component
 * Manages the multi-step form process for generating a custom running plan
 *
 * @returns {JSX.Element} The plan generator page component
 */
function PlanGeneratorPage() {
  const [formData, setFormData] = useState({
    demographics: {
      biologicalSex: '',
      age: '',
      weight: '',
      weightUnit: 'kg',
      height: '',
      heightUnit: 'cm',
      heightFeet: '',
      heightInches: ''
    },
    trainingHistory: { currentWeeklyMileage: '', mileageUnit: 'km', recentRaces: [{distance: '', time: ''}], injuryHistory: '' },
    goalConfig: { raceType: '', raceDistanceCustom: '', targetDate: '', optimizationFocus: '' },
    lifestyle: { availableDays: [], preferredWorkouts: [], equipmentAccess: [], interestedInBarefoot: false },
    trailSpecific: { raceElevationGain: '', elevationUnit: 'm', hasHillAccess: false, hasTreadmillAccess: false, terrainType: [] },
    barefoot: { experienceLevel: '', transitionTarget: '', currentFootwear: '', surfaceAccess: [] }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Set the background image for the plan generator page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-plan.jpg)';

      // Optimize background position for mobile
      const optimizeForMobile = () => {
        if (window.innerWidth <= 768) {
          pageBackground.style.backgroundPosition = 'center center';
        } else {
          pageBackground.style.backgroundPosition = 'center';
        }
      };

      // Run optimization immediately and on resize
      optimizeForMobile();
      window.addEventListener('resize', optimizeForMobile);

      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', optimizeForMobile);
      };
    }
  }, []);

  // Add this useEffect to ensure the page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateFormData = (formName, data) => {
    setFormData(prev => ({ ...prev, [formName]: data }));
  };

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const handleGeneratePlan = async () => {
    setIsLoading(true);

    try {
      console.log('All form data collected:', formData);
      console.log("SPECIFICALLY AVAILABLE DAYS:", formData.lifestyle.availableDays); // Crucial check!

      // Generate the running plan using the planGenerator
      const generatedPlan = generateRunningPlan(formData);

      // Check if there was an error in plan generation
      if (generatedPlan.error) {
        console.error('Error generating plan:', generatedPlan.error);
        throw new Error(generatedPlan.error);
      }

      console.log('Generated Plan:', generatedPlan);

      // Check if there is an authenticated user
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      console.log('Current authenticated user:', currentUser);

      // Construct the insert payload dynamically based on authentication status
      const insertData = {
        plan_data: generatedPlan,
        plan_type: 'freemium'
      };

      // If user is authenticated, include their email in the insert data
      if (currentUser) {
        insertData.user_email = currentUser.email;
        console.log('Including user email in plan data:', currentUser.email);
      } else {
        console.log('Anonymous user - not including user_email in plan data');
      }

      console.log('Data being inserted:', insertData);

      // Make sure the background image is still set to running-plan.jpg before navigating
      const pageBackground = document.querySelector('.page-background');
      if (pageBackground) {
        pageBackground.style.backgroundImage = 'url(/images/running-plan.jpg)';
      }

      const { data: newPlan, error: insertError } = await supabase
        .from('running_plans')
        .insert([insertData])
        .select('id')
        .single();

      if (insertError) {
        console.error('Error saving plan to Supabase:', insertError);
        throw insertError;
      }

      if (newPlan && newPlan.id) {
        console.log('Plan saved to Supabase with ID:', newPlan.id);
        navigate(`/running-plans/plan/${newPlan.id}`); // Use nested route
      } else {
        console.error('No ID returned from Supabase after insert, or newPlan is null.');
        throw new Error('No ID returned from Supabase after insert.');
      }
    } catch (e) {
      console.error('Error in plan generation or saving:', e);
      alert('Error: ' + (e.message || 'Unknown error'));
      setIsLoading(false);
    }
    // Note: We don't need a finally block with setIsLoading(false) here
    // because on success we navigate away from this page, and on error
    // we already set isLoading to false in the catch block
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
    title: "Alt.Run: Free Running Planner",
    description: "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running planner.",
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
      "name": "Alt.Run: Free Running Planner",
      "description": "Create a personalized running training plan tailored to your goals, experience level, and lifestyle with Alt.Run's free running planner.",
      "isPartOf": { "@id": "https://alt.run/#website" }
    }
  };

  // We no longer return a completely different component when loading
  // Instead, we'll show an overlay with the spinner while keeping the background intact

  return (
    <div className="running-plans-page">
      <SEO {...seoData} />

      {/* Loading Overlay - only shown when isLoading is true */}
      {isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}

      <div className="running-plans-header">
        <div className="guide-header-top">
          <img src="/logo-glow.webp" alt="Alt.Run Logo" className="guide-logo" />
          <ShareButton
            title="Alt.Run Free Running Planner"
            text="Create your personalized running plan with Alt.Run's free running planner!"
          />
        </div>
        <h1>Free Running Planner</h1>
        <p>Create your personalized running plan in just a few steps</p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
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

export default PlanGeneratorPage;






