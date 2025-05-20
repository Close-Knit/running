// src/components/forms/EmailCaptureForm.jsx
import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterIcon,
  FacebookIcon,
  RedditIcon
} from 'react-share';
import './FormStyles.css';

/**
 * Form component for capturing user email to associate with a plan
 * and sending a magic link for authentication
 *
 * @param {Object} props - Component props
 * @param {string} props.planId - The ID of the plan to associate with the email
 * @param {Function} props.onEmailAssociated - Callback function to call when email is successfully associated
 * @returns {JSX.Element} The email capture form component
 */
function EmailCaptureForm({ planId, onEmailAssociated }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Create a proper share URL that works even on localhost
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  const deployedBaseUrl = 'https://alt.run'; // The production URL
  const shareUrl = isLocalhost
    ? `${deployedBaseUrl}/running-plans/plan/${planId}` // Use production URL when on localhost
    : (typeof window !== 'undefined' ? window.location.href : ''); // Use actual URL in production

  const shareTitle = "Check out my Alt.Run training plan!";

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear any previous messages when the user types
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      // First, update the plan with the user's email
      const { error: updateError } = await supabase
        .from('running_plans')
        .update({ user_email: email })
        .eq('id', planId);

      if (updateError) {
        throw updateError;
      }

      // Then, send a magic link to the user's email with custom subject and message
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.href, // Redirect back to the current page after authentication
          data: {
            // Custom data to include in the email template
            planId: planId,
            subject: "Your Alt.Run Training Plan",
            message: "Thank you for using Alt.Run for your Free Running Plan Generator. Here is your Magic Link to your personalized training plan."
          }
        },
      });

      if (signInError) {
        throw signInError;
      }

      // Show success message and confirmation instructions
      setMessage('Success! Check your email for a magic link to access your plan.');
      setShowConfirmation(true);

      // Call the callback function to notify parent component
      if (onEmailAssociated) {
        onEmailAssociated(email);
      }
    } catch (err) {
      console.error('Error associating email with plan:', err);
      setError(err.message || 'Failed to save your email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container email-capture-form">
      <h2>Save Your Plan (Optional)</h2>

      {!showConfirmation ? (
        <>
          <p className="form-description">
            Enter your email to save this plan and receive a link to access it anytime.
            We'll also send you a magic link for secure access without a password.
            Please ensure you enter your correct email address.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="your.email@example.com"
                required
                disabled={loading}
              />
            </div>

            {error && <div className="form-error">{error}</div>}
            {message && <div className="form-success">{message}</div>}

            <div className="form-buttons">
              <button
                type="submit"
                className="next-button"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Save & Send Magic Link'}
              </button>

              <div className="social-share-inline">
                <span className="share-label">Share:</span>
                <TwitterShareButton url={shareUrl} title={shareTitle} className="social-share-button twitter-button">
                  <TwitterIcon size={28} round />
                </TwitterShareButton>
                <FacebookShareButton url={shareUrl} quote={shareTitle} className="social-share-button facebook-button">
                  <FacebookIcon size={28} round />
                </FacebookShareButton>
                <div
                  onClick={() => window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`, '_blank')}
                  className="social-share-button reddit-button"
                >
                  <RedditIcon size={28} round />
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="confirmation-message">
          <p>
            <strong>Check your inbox!</strong> We've sent a magic link to <strong>{email}</strong>.
          </p>
          <p>
            Click the link in the email to securely access your running plan anytime.
            No password needed!
          </p>
          <p className="note">
            <em>Note: If you don't see the email, please check your spam folder.</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default EmailCaptureForm;
