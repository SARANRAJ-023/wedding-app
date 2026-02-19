"use client";

import React, { useEffect, useState } from 'react';
import { Plus, MousePointer2, Calendar, CheckSquare, LogOut, Edit2, Settings } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import LogoImg from '../../assets/logo.png';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; image: string | null } | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('userProfile');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">

            {/* --- Header Section --- */}
            <div className="px-8 pt-10 flex justify-between items-start">
                <div className="space-y-2">
                    {/* Logo Placeholder - Matches the 'W' shape in screenshot */}
                    {/* Logo - Animated from Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-16 h-16 flex items-center justify-center z-20"
                    >
                        <Image
                            src={LogoImg}
                            alt="Logo"
                            width={150}
                            height={150}
                            className="max-w-[90px] h-auto rounded-tl-xl rounded-br-xl"
                        />
                    </motion.div>
                    <h1 className="text-4xl font-light text-gray-500">
                        Hey <span className="font-normal text-black">{user?.name || "Guest"}!</span>
                    </h1>
                </div>


                {/* Profile Image & Dropdown */}
                <div className="relative">
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-20 h-20 rounded-full border-4 border-gray-100 overflow-hidden shadow-lg cursor-pointer"
                    >
                        <img
                            src={user?.image || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                            >
                                <div className="py-1">
                                    <button
                                        onClick={() => router.push('/profile')}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                        <Edit2 size={18} />
                                        <span>Edit Profile</span>
                                    </button>
                                    <button
                                        onClick={() => console.log('Settings clicked')}
                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                                    >
                                        <Settings size={18} />
                                        <span>Settings</span>
                                    </button>
                                    <div className="h-px bg-gray-100 my-1" />
                                    <button
                                        onClick={() => {
                                            localStorage.removeItem('userProfile');
                                            router.push('/sign-up');
                                        }}
                                        className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* --- Bento Grid Layout --- */}
            <div className="px-6 mt-10 grid grid-cols-2 gap-4">

                {/* Your Events (Purple) */}
                <div className="bg-[#B197FC] rounded-[32px] p-6 text-white h-64 flex flex-col justify-between relative overflow-hidden">
                    <div>
                        <p className="text-2xl font-light leading-tight">Your<br />Events</p>
                        <p className="text-7xl font-light mt-2">02</p>
                    </div>
                    <Calendar className="absolute bottom-6 right-6 w-12 h-12 opacity-40" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-4">
                    {/* Create Event (Peach/Coral) */}
                    <div className="bg-[#FFA8A8] rounded-[24px] p-4 text-white flex flex-col items-center justify-center h-32 space-y-1">
                        <Plus className="w-8 h-8" strokeWidth={3} />
                        <p className="text-xl font-light">Create <span className="font-normal">Event</span></p>
                    </div>

                    {/* Attended Events (Blue) */}
                    <div className="bg-[#91D5FF] rounded-[32px] p-5 text-white h-64 flex flex-col justify-between relative">
                        <div>
                            <p className="text-2xl font-light leading-tight">Attended<br />Events</p>
                            <p className="text-6xl font-light mt-2">05</p>
                        </div>
                        <CheckSquare className="absolute bottom-6 right-6 w-12 h-12 opacity-40" strokeWidth={1.5} />
                    </div>
                </div>

                {/* View Event (Mint Green) - Moved up via grid span or negative margin to match overlap */}
                {/* View Event (Mint Green) */}
                <motion.div
                    onClick={() => router.push('/home')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#63E6BE] rounded-[32px] p-6 text-white flex flex-col items-center justify-center -mt-32 h-44 space-y-2 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                >
                    <MousePointer2 className="w-10 h-10 rotate-[-15deg]" fill="white" />
                    <p className="text-2xl font-light"><span className="font-normal">View</span> Event</p>
                </motion.div>
            </div>

            {/* --- Bottom Footer Section --- */}
            <div className="mt-auto px-8 pb-12 flex flex-col items-center">
                <div className="flex justify-between items-center w-full mb-10">
                    <p className="text-gray-500 font-light text-lg leading-snug max-w-[180px]">
                        Let's share happy moments with your loved ones
                    </p>
                    <button className="bg-black text-white px-6 py-2 rounded-full text-lg font-light shadow-md active:scale-95 transition-transform">
                        Invite Friends
                    </button>
                </div>

                {/* The bottom decorative curve */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-white border-t border-gray-100 rounded-t-[100%] scale-x-125 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]"></div>
            </div>
        </div>
    );
}