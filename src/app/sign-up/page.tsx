"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, ArrowRight, ChevronLeft, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function SignupFlow() {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('userProfile');
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  // 1. Handle Custom Dial Pad & Sync with Manual Typing
  const handleKeyPress = (val: number | string) => {
    if (isRedirecting) return;
    const isPhone = step === 'phone';
    const setter = isPhone ? setPhoneNumber : setOtp;
    const maxLen = isPhone ? 10 : 4;
    const currentVal = isPhone ? phoneNumber : otp;

    if (typeof val === 'number') {
      if (currentVal.length < maxLen) setter(prev => prev + val.toString());
    } else if (val === '⌫') {
      setter(prev => prev.slice(0, -1));
    } else if (val === '→') {
      handleNext();
    }
  };



  // 2. Navigation Logic
  const handleNext = () => {
    if (step === 'phone' && phoneNumber.length === 10) {
      setStep('otp');
    } else if (step === 'otp' && otp.length === 4) {
      // Trigger the "Swipe to Profile" animation
      setIsRedirecting(true);

      // Navigate to profile page after animation
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    }
  };

  const getTheme = () => {
    if (isRedirecting) return 'from-[#22C55E] to-[#16A34A]';
    return step === 'phone' ? 'from-[#7B42F6] to-[#B066FE]' : 'from-[#D64343] to-[#E96161]';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">

      {/* Container that slides everything to the left on success */}
      <div
        className="flex flex-col h-full transition-transform duration-700 ease-in-out"
        style={{ transform: isRedirecting ? 'translateX(-100%)' : 'translateX(0%)' }}
      >
        <div className="min-w-full flex flex-col min-h-screen">

          {/* Header Section */}
          <div className={`relative h-64 bg-gradient-to-br ${getTheme()} p-8 transition-all duration-700`}>
            {step === 'otp' && !isRedirecting && (
              <button onClick={() => setStep('phone')} className="absolute top-8 left-6 text-white/80 hover:text-white">
                <ChevronLeft size={28} />
              </button>
            )}
            <h1 className="text-white text-5xl font-light mt-16 tracking-wide">
              {step === 'phone' ? 'Sign Up' : 'Verify'}
            </h1>
          </div>

          {/* Main Content Area */}
          <div className="relative -mt-16 bg-white rounded-t-[60px] flex-grow px-8 pt-12 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: step === 'phone' ? 'translateX(0%)' : 'translateX(-100%)' }}
            >
              {/* STEP 1: Phone */}
              <div className="min-w-full pr-8">
                <div className="space-y-1 mb-10">
                  <h2 className="text-[#333333] text-3xl font-normal">Start your journey</h2>
                  <h2 className="text-[#7B42F6] text-3xl font-light">with <span className="font-normal">Wish Wallet</span></h2>
                </div>
                <div className="relative flex items-center border-b border-gray-300 pb-2 focus-within:border-[#7B42F6]">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number"
                    className="w-full text-lg outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* STEP 2: OTP */}
              <div className="min-w-full pr-8 pl-8">
                <div className="space-y-1 mb-10">
                  <h2 className="text-[#333333] text-3xl font-normal">Security Check</h2>
                  <p className="text-gray-400">Sent to +91 {phoneNumber}</p>
                </div>
                <div className="relative flex items-center border-b border-gray-300 pb-2 focus-within:border-[#D64343]">
                  <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="4-digit OTP"
                    className="w-full text-lg tracking-[1em] font-bold outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Floating Action Button */}
            <div className="mt-12 flex justify-end pb-8">
              <button
                onClick={handleNext}
                disabled={step === 'phone' ? phoneNumber.length < 10 : otp.length < 4}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300 bg-gradient-to-br ${getTheme()} ${(step === 'phone' ? phoneNumber.length < 10 : otp.length < 4) ? 'opacity-50 grayscale' : 'opacity-100'}`}
              >
                <ArrowRight className="text-white w-7 h-7" />
              </button>
            </div>
          </div>

          {/* Dial Pad */}
          <div className={`bg-[#EAEAEA] p-1 grid grid-cols-4 gap-1 select-none transition-transform duration-500 ${isRedirecting ? 'translate-y-full' : 'translate-y-0'}`}>
            {[1, 2, 3, '-', 4, 5, 6, ',', 7, 8, 9, '⌫', '.', 0, '␣', '→'].map((key, idx) => (
              <button
                key={idx}
                onClick={() => handleKeyPress(key)}
                className="h-14 flex items-center justify-center rounded-sm text-xl font-medium bg-white active:bg-gray-200 transition-colors"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* --- SIMULATED PROFILE PAGE (This is what swipes in) --- */}
        <div className="min-w-full min-h-screen bg-white absolute left-full top-0 flex flex-col items-center justify-center p-8">
          <div className="animate-bounce mb-4">
            <CheckCircle2 size={80} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome!</h2>
          <p className="text-gray-500 text-center mt-2">Your account has been verified. Loading your profile...</p>
        </div>
      </div>
    </div>
  );
}