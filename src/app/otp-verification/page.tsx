"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function OTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(20);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer Logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev: number) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const formatTime = (seconds: number) => {
        return `00:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">

            {/* --- Top Gradient Header (Red/Coral) --- */}
            <div className="relative h-64 bg-gradient-to-br from-[#D64343] to-[#E96161] p-8 overflow-hidden">
                {/* Decorative Dotted Grid */}
                <div className="absolute top-12 left-6 opacity-30">
                    <div className="grid grid-cols-5 gap-1">
                        {[...Array(25)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                        ))}
                    </div>
                </div>

                <h1 className="text-white text-5xl font-light mt-16 tracking-wide">
                    OTP Verification
                </h1>
            </div>

            {/* --- Main Content Area with Curve --- */}
            <div className="relative -mt-16 bg-white rounded-t-[60px] flex-grow px-8 pt-12">

                <div className="space-y-1 mb-16">
                    <h2 className="text-[#333333] text-3xl font-light leading-tight">
                        Enter <span className="text-[#D64343]">OTP</span> sent to your
                    </h2>
                    <h2 className="text-[#333333] text-3xl font-light">
                        mobile number
                    </h2>
                </div>

                {/* --- OTP Input Fields --- */}
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-4">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el }}
                                value={data}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                                className="w-12 h-12 border-b-2 border-gray-300 text-center text-2xl outline-none focus:border-[#D64343] transition-colors"
                            />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm font-light">
                        {formatTime(timer)}
                    </span>
                </div>

                {/* --- Resend & Action Row --- */}
                <div className="mt-12 flex justify-between items-center">
                    <p className="text-gray-500 text-sm font-light">
                        Didn't receive the code? <button className="text-[#D64343] underline">Resend</button>
                    </p>

                    <button
                        className="w-14 h-14 bg-gradient-to-br from-[#D64343] to-[#E96161] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    >
                        <ArrowRight className="text-white w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* --- Simulated Custom Numeric Keyboard --- */}
            <div className="bg-[#E0E0E0] p-1 grid grid-cols-4 gap-1 select-none">
                {[1, 2, 3, '-', 4, 5, 6, ',', 7, 8, 9, '⌫', '.', 0, '␣', '→'].map((key: number | string, idx: number) => (
                    <div
                        key={idx}
                        className={`h-12 flex items-center justify-center rounded-sm text-xl font-medium shadow-sm 
              ${typeof key === 'number' || key === '.' ? 'bg-white text-black' : 'bg-[#F5F5F5] text-gray-600'}
              ${key === '→' ? 'text-blue-500' : ''}
            `}
                    >
                        {key}
                    </div>
                ))}
            </div>
        </div>
    );
}