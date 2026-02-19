"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProfileSetup = () => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dob: "",
        location: ""
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('userProfile');
        if (user) {
            router.push('/dashboard');
        }
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTriggerUpload = () => {
        fileInputRef.current?.click();
    };

    const handleSaveAndNavigate = () => {
        // Basic validation
        if (!formData.name) {
            alert("Please enter your name!");
            return;
        }

        // Save to localStorage (Simulating backend)
        const userProfile = {
            ...formData,
            image: profileImage
        };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Navigate to Dashboard
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-white font-sans overflow-hidden flex flex-col">

            {/* Wave Header Section - Teal Gradient */}
            <div className="relative h-[35vh] w-full">
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#2BAE95] to-[#1F9B88]"
                    style={{
                        clipPath: 'path("M0 0 H414 V200 C350 300 100 150 0 300 Z")',
                        height: '110%'
                    }}
                >
                    {/* Decorative Dot Pattern */}
                    <div className="absolute top-12 left-8 opacity-20 grid grid-cols-4 gap-2">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
                        ))}
                    </div>

                    {/* Title */}
                    <div className="absolute top-24 left-10">
                        <h1 className="text-white text-6xl font-light tracking-tight">Profile</h1>
                    </div>
                </div>

                {/* Floating Upload Button */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                />
                <motion.button
                    onClick={handleTriggerUpload}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-10 bottom-[-30px] w-24 h-24 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border border-gray-50 z-20 overflow-hidden"
                >
                    {profileImage ? (
                        <img src={profileImage} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <div className="text-[#2BAE95]">
                                <ImagePlus size={36} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 font-medium">Upload Pic</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* Form Content Section */}
            <main className="flex-1 px-10 pt-20 flex flex-col bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-12"
                >
                    {/* Input: Sweet Name */}
                    <div className="border-b border-gray-300 pb-2">
                        <input
                            type="text"
                            placeholder="Sweet Name"
                            value={formData.name}
                            className="w-full text-xl font-light text-gray-500 placeholder:text-gray-300 outline-none bg-transparent"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Input: Email id */}
                    <div className="border-b border-gray-300 pb-2">
                        <input
                            type="email"
                            placeholder="Email id"
                            value={formData.email}
                            className="w-full text-xl font-light text-gray-500 placeholder:text-gray-300 outline-none bg-transparent"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Input: Date Of Birth */}
                    <div className="border-b border-gray-300 pb-2">
                        <input
                            type="date"
                            placeholder="Date Of Birth"
                            value={formData.dob}
                            className="w-full text-xl font-light text-gray-500 placeholder:text-gray-300 outline-none bg-transparent"
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                    </div>

                    {/* Input: Location */}
                    <div className="border-b border-gray-300 pb-2">
                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location}
                            className="w-full text-xl font-light text-gray-500 placeholder:text-gray-300 outline-none bg-transparent"
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </motion.div>

                {/* Floating Action Button - Positioned exactly as shown */}
                <div className="mt-auto mb-16 flex justify-end">
                    <motion.button
                        onClick={handleSaveAndNavigate}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 rounded-full bg-[#2BAE95] flex items-center justify-center text-white shadow-xl shadow-teal-100"
                    >
                        <ArrowRight size={32} strokeWidth={2.5} />
                    </motion.button>
                </div>
            </main>
        </div>
    );
};

export default ProfileSetup;