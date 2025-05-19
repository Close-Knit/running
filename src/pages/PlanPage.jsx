// src/pages/PlanPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmailCaptureForm from '../components/forms/EmailCaptureForm';
import PlanDisplayTable from '../components/PlanDisplayTable';
import PlanPDFDocument from '../components/pdf/PlanPDFDocument';
import SEO from '../components/SEO';
import './PlanPage.css';

/**
 * Plan Page component
 * Displays a generated running plan
 *
 * @returns {JSX.Element} The plan page component
 */
function PlanPage() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailAssociated, setEmailAssociated] = useState(false);

  // Handle email association with the plan
  const handleEmailAssociated = (email) => {
    // Update the local state to reflect the email association
    setPlan(prevPlan => ({
      ...prevPlan,
      user_email: email
    }));
    setEmailAssociated(true);
  };

  useEffect(() => {
    async function fetchPlan() {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('running_plans')
          .select('id, plan_data, user_email, created_at')
          .eq('id', planId)
          .single();

        if (error) throw error;

        setPlan(data);
      } catch (e) {
        console.error('Error fetching plan:', e);
        setError(e.message || 'Failed to fetch plan');
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [planId]);

  // Set the background image for the plan page
  useEffect(() => {
    const pageBackground = document.querySelector('.page-background');
    if (pageBackground) {
      pageBackground.style.backgroundImage = 'url(/images/running-plans.jpg)';
    }
  }, []);

  // Define SEO data for the plan page
  const seoData = {
    title: plan && plan.plan_data && plan.plan_data.summary
      ? `Alt.Run: ${plan.plan_data.summary}`
      : "Alt.Run: Running Plan",
    description: "Your personalized running training plan from Alt.Run, tailored to your goals, experience level, and lifestyle.",
    canonicalUrl: `/plan/${planId}`,
    noindex: true, // Don't index individual plan pages
  };

  if (loading) return (
    <div className="plan-page">
      <SEO {...seoData} />
      <LoadingSpinner />
    </div>
  );

  if (error) return (
    <div className="plan-page">
      <SEO {...seoData} />
      <div className="plan-error">
        <h2>Error Loading Plan</h2>
        <p>{error}</p>
        <Link to="/running-plans" className="button">Create New Plan</Link>
      </div>
    </div>
  );

  if (!plan) return (
    <div className="plan-page">
      <SEO {...seoData} />
      <div className="plan-error">
        <h2>Plan Not Found</h2>
        <p>The requested plan could not be found.</p>
        <Link to="/running-plans" className="button">Create New Plan</Link>
      </div>
    </div>
  );

  // Extract plan data
  const { plan_data, user_email, created_at } = plan;

  // Format creation date
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Check if plan_data has the expected structure
  const hasDetailedPlan = plan_data && plan_data.summary && plan_data.periodization && plan_data.weeklySchedule;

  return (
    <div className="plan-page">
      <SEO {...seoData} />

      <div className="plan-header">
        <h1>{hasDetailedPlan ? plan_data.summary : 'Your Running Plan'}</h1>
        <p>Created on {formattedDate}</p>
      </div>

      {/* Email association section */}
      <div className="plan-email-section">
        {user_email ? (
          <div className="plan-email-info">
            <h3>Plan Saved</h3>
            <p>This plan is saved to <strong>{user_email}</strong></p>
            <p className="email-note">You can access this plan anytime by clicking the magic link sent to your email.</p>
          </div>
        ) : (
          <EmailCaptureForm
            planId={planId}
            onEmailAssociated={handleEmailAssociated}
          />
        )}
      </div>

      {hasDetailedPlan ? (
        <>
          <div className="plan-summary">
            <h2>Plan Overview</h2>
            <div className="plan-phases">
              <div className="plan-phase">
                <h3>Base Phase</h3>
                <p>{plan_data.periodization.base} weeks</p>
              </div>
              <div className="plan-phase">
                <h3>Intensity Phase</h3>
                <p>{plan_data.periodization.intensity} weeks</p>
              </div>
              <div className="plan-phase">
                <h3>Taper Phase</h3>
                <p>{plan_data.periodization.taper} weeks</p>
              </div>
            </div>
          </div>

          <div className="plan-schedule">
            <h2>Weekly Schedule</h2>
            <PlanDisplayTable weeklySchedule={plan_data.weeklySchedule} />
          </div>
        </>
      ) : (
        <div className="plan-raw-data">
          <h2>Plan Details</h2>
          <pre className="json-display">
            {JSON.stringify(plan_data, null, 2)}
          </pre>
        </div>
      )}

      <div className="plan-actions">
        <Link to="/running-plans" className="button">Create New Plan</Link>
        <button className="button" onClick={() => window.print()}>Print Plan</button>
        {hasDetailedPlan && (
          <PDFDownloadLink
            document={<PlanPDFDocument planData={plan_data} />}
            fileName={`alt-run-plan-${planId}.pdf`}
            className="button pdf-button"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Preparing PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        )}
      </div>

      <div className="plan-disclaimer">
        <h3>Important Disclaimer</h3>
        <p>This plan is generated based on the information you provided and is intended as a general guide only. Always consult with a healthcare professional before starting any new exercise program, especially if you have any health concerns or conditions. Listen to your body and adjust the plan as needed.</p>
      </div>
    </div>
  );
}

export default PlanPage;
