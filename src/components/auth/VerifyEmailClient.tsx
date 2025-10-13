'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const VerifyEmailClient = () => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [verificationMessage, setVerificationMessage] = useState('Verifying your email address');
  const [isApiCalled, setIsApiCalled] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');

  useEffect(() => {
    if (token && !isApiCalled) {
      setIsApiCalled(true);

      axios
        .post('https://king-prawn-app-x9z27.ondigitalocean.app/api/user/verify-email', { token })
        .then((response) => {
          setVerificationStatus('success');
          setVerificationMessage(response.data.message || 'Your email has been successfully verified!');
        })
        .catch((error) => {
          setVerificationStatus('failed');
          setVerificationMessage(error.response?.data?.message || 'Email verification failed. Please try again.');
        });
    } else if (!token) {
      setVerificationStatus('failed');
      setVerificationMessage('Invalid verification link. Please check your email for the correct link.');
    }
  }, [token, isApiCalled]);

  const getStatusStyles = () => {
    switch (verificationStatus) {
      case 'success':
        return {
          bg: 'from-emerald-50 via-white to-teal-50',
          icon: '✅',
          title: 'Email Verified!',
          textColor: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200'
        };
      case 'failed':
        return {
          bg: 'from-rose-50 via-white to-amber-50',
          icon: '❌',
          title: 'Verification Failed',
          textColor: 'text-rose-600',
          bgColor: 'bg-rose-50',
          borderColor: 'border-rose-200'
        };
      default:
        return {
          bg: 'from-blue-50 via-white to-indigo-50',
          icon: '⏳',
          title: 'Verifying Email',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
    }
  };

  const status = getStatusStyles();

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${status.bg}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-200 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-200 opacity-20 blur-3xl"></div>
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-emerald-100/50 backdrop-blur-sm">
            {/* Title */}
            <h2 className={`mb-2 text-center text-3xl font-bold ${status.textColor}`}>
              {status.title}
            </h2>

            {/* Message */}
            <div className={`mb-8 rounded-lg border ${status.borderColor} ${status.bgColor} p-4 text-center`}>
              <p className={status.textColor}>{verificationMessage}</p>
            </div>

            {verificationStatus === 'success' && (
              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:shadow-xl hover:shadow-emerald-300"
              >
                Continue to Home
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailClient;
