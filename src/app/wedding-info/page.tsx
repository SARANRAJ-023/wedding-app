"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import HeaderImage from '@/assets/3.Wedding-Info/wedding-info-3d-icon.png';

const WeddingInfo = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, icon: <Users size={24} /> },
    { id: 1, icon: <Calendar size={24} /> },
    { id: 2, icon: <MapPin size={24} /> },
  ];

  // Variants for the slide animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newTabId: number) => {
    setPage([newTabId, newTabId > page ? 1 : -1]);
    setActiveTab(newTabId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8E54E9] to-[#4776E6] p-4 font-sans text-slate-700">
      <div className="w-full max-w-md relative overflow-hidden flex flex-col items-center">

        {/* Header Navigation */}
        <div className="w-full flex items-center justify-between px-6 py-8 text-white">
          <Link href="/home">
            <button className="cursor-pointer hover:opacity-80 transition-opacity">
              <ChevronLeft size={28} />
            </button>
          </Link>
          <h1 className="text-3xl font-light tracking-wide">Wedding Info</h1>
          <div className="w-7" /> {/* Spacer */}
        </div>

        {/* 3D Decorative Area */}
        <div className="relative w-full h-64 mb-[-4px] flex items-center justify-center">
          <Image
            src={HeaderImage}
            alt="Wedding Info 3D Illustration"
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-8 mb-[6px] z-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => paginate(tab.id)}
              className={`p-4 rounded-full transition-all duration-300 ${activeTab === tab.id
                ? 'bg-white text-[#8E54E9] scale-125 shadow-lg'
                : 'bg-white/20 text-white'
                }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>

        {/* Carousel Content Card */}
        <div className="bg-white w-full rounded-[45px] min-h-[450px] shadow-2xl relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              {/* SLIDE 1: COUPLE */}
              {activeTab === 0 && (
                <div className="w-full h-full p-8 pt-16 space-y-3 mt-[-20px]">
                  <p className="text-gray-400 italic">The Groom</p>
                  <h2 className="text-3xl font-normal">Vijay Kumar</h2>
                  <span className="text-4xl font-serif text-[#8E54E9]">&</span>
                  <p className="text-gray-400 italic">The Bride</p>
                  <h2 className="text-3xl font-normal">Pooja Kumar</h2>

                  <div className="pt-8">
                    <h3 className="text-3xl font-light text-[#A88BEB] mb-4">Our Love Story</h3>
                    <p className="text-gray-500 leading-relaxed font-light">
                      We cordially invite you for our wedding and awaiting your presence.
                      Your blessings are much important. Waiting to see you!
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 2: EVENTS */}
              {activeTab === 1 && (
                <div className="w-full h-full p-8 pt-16 space-y-10">
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl text-[#A88BEB] mb-4">Engagement</h3>
                    <div className="flex items-center gap-6 w-full px-4">
                      <div className="text-[#8E54E9] opacity-40"><Calendar size={48} /></div>
                      <div className="text-left">
                        <p className="text-lg font-medium">20th Aug 2022</p>
                        <p className="text-gray-400">Thursday</p>
                        <p className="text-gray-400">07:30 PM to 09:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-gray-100" />
                  <div className="flex flex-col items-center">
                    <h3 className="text-2xl text-[#A88BEB] mb-4">Wedding</h3>
                    <div className="flex items-center gap-6 w-full px-4">
                      <div className="text-[#8E54E9] opacity-40"><Users size={48} /></div>
                      <div className="text-left">
                        <p className="text-lg font-medium">01st Dec 2022</p>
                        <p className="text-gray-400">Thursday</p>
                        <p className="text-gray-400">07:30 PM to 09:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: LOCATION */}
              {activeTab === 2 && (
                <div className="w-full h-full relative">
                  {/* Map Background */}
                  <div className="absolute inset-0 bg-slate-100">
                    <iframe
                      src="https://maps.google.com/maps?q=SET+Mahal,+Kumbakonam&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full border-0 opacity-80"
                      title="SET Mahal Location"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>

                  {/* Map Pins */}
                  <div className="absolute top-[40%] left-[45%]">
                    <MapPin className="text-gray-700 w-12 h-12 drop-shadow-lg fill-white" strokeWidth={1.5} />
                  </div>
                  <div className="absolute top-[45%] left-[30%]">
                    <MapPin className="text-[#8E54E9] w-12 h-12 drop-shadow-lg fill-white" strokeWidth={1.5} />
                  </div>

                  {/* Floating Venue Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white p-3 rounded-2xl shadow-xl border border-gray-100/50 text-left flex gap-4 backdrop-blur-sm bg-white/95">
                    <div className="w-20 h-20 bg-amber-100 rounded-xl shrink-0 overflow-hidden relative">
                      <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=200&h=200"
                        alt="Venue"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-sm text-[#AA88FF] font-medium mb-0.5 font-sans">Wedding</p>
                      <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">SET Mahal</h4>
                      <p className="text-[10px] text-gray-400 leading-tight pr-2">Near Bus Stand, Chennai Highway, Kumbakonam, Tanjore Dt, Tamilnadu, India</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WeddingInfo;