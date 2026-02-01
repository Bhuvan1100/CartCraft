import { useState, useEffect } from 'react';
import { EnvelopeIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { auth } from '../../Firebase/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    // Get current user email
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    } else {
      // If no user, redirect to sign in
      navigate('/signin');
    }
  }, [navigate]);

  // Timer countdown effect
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendSuccess(false);

    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setResendSuccess(true);
        setResendTimer(60); // Set 60 second timer
        setTimeout(() => setResendSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to resend email. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    setCheckingVerification(true);

    try {
      const user = auth.currentUser;
      if (user) {
        // Reload user to get latest email verification status
        await user.reload();

        if (user.emailVerified) {
          // Email is verified, navigate to dashboard or home
          navigate('/'); // Change this to your desired route
        } else {
          alert('Email not verified yet. Please check your inbox and click the verification link.');
        }
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    } finally {
      setCheckingVerification(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 rounded-full p-4">
              <EnvelopeIcon className="h-12 w-12 text-purple-600" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-sm text-gray-600">
              We've sent a verification link to
            </p>
            <p className="text-sm font-medium text-purple-600 mt-1">{email}</p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-2">Next steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-blue-700">
                  <li>Check your email inbox</li>
                  <li>Click the verification link</li>
                  <li>Return here and click "I've verified"</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {resendSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800 text-center">
                ✓ Verification email sent successfully!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleCheckVerification}
              disabled={checkingVerification}
              className="w-full bg-gray-900 text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingVerification ? 'Checking...' : "I've Verified My Email"}
            </button>

            <button
              onClick={handleResendEmail}
              disabled={resendLoading || resendTimer > 0 || checkingVerification}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className={`h-5 w-5 ${resendLoading ? 'animate-spin' : ''}`} />
              {resendLoading
                ? 'Sending...'
                : resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : 'Resend Verification Email'
              }
            </button>

          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-3">
              Didn't receive the email? Check your spam folder or click resend.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="text-sm cursor-pointer text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}