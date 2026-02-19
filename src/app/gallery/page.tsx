"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import CamImage from '@/assets/6.gallery/camera.png';

// Your custom images array
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1465495910483-34a1be90cdd8?auto=format&fit=crop&q=80&w=800"
];

const WeddingApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#77C144] to-[#B0D235] flex flex-col items-center font-sans overflow-x-hidden">

      {/* Navigation Header */}
      <header className="w-full max-w-md flex items-center justify-between px-6 pt-10 pb-6 text-white">
        <Link href="/home">
          <button>
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>
        </Link>
        <h1 className="text-4xl font-light tracking-wide capitalize">Gallery</h1>
        <div className="w-8" />
      </header>

      <main className="w-full max-w-md flex flex-col items-center px-4">

        {/* Floating Cameras */}
        <div className="relative w-72 h-48 mb-[-40px] z-20 flex items-center justify-center pointer-events-none">
          <Image
            src={CamImage}
            alt="Camera Img"
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Gallery White Card Container */}
        <div className="bg-white z-20 w-full rounded-[45px] p-4 pt-10 shadow-2xl min-h-[600px] flex flex-col">

          {/* VERTICAL SLIDE-UP STACK */}
          <div className="relative h-80 w-full mb-6 perspective-1000">
            <AnimatePresence>
              {[2, 1, 0].map((offset) => {
                const index = (currentIndex + offset) % GALLERY_IMAGES.length;
                const imageUrl = GALLERY_IMAGES[index];

                return (
                  <motion.div
                    key={`${imageUrl}-${index}`}
                    initial={{ opacity: 0, scale: 0.9, y: 20, zIndex: 10 - offset }}
                    animate={{
                      scale: 1 - offset * 0.05,
                      y: offset * 12, // Slight offset for cards behind
                      opacity: 1 - offset * 0.2,
                      zIndex: 10 - offset,
                    }}
                    exit={{
                      zIndex: 100, // Force strictly on top
                      y: -800, // Move further up
                      scale: 0.2, // Minimize significantly
                      opacity: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Smooth elegant ease
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl bg-gray-100 cursor-grab active:cursor-grabbing"
                    drag={offset === 0 ? "y" : false} // Drag vertically
                    dragConstraints={{ top: -200, bottom: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(e, info) => {
                      // Trigger slide up if dragged up more than 80px
                      if (info.offset.y < -80) {
                        handleNext();
                      }
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Wedding ${index}`}
                      className="object-cover w-full h-full pointer-events-none"
                    />

                    {/* Visual Indicator for Active Card */}
                    {offset === 0 && (
                      <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <div className="bg-white/30 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white uppercase tracking-widest border border-white/20">
                          Slide Up
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Grid Section - Synchronized with the stack */}
          <div className="grid grid-cols-3 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                onClick={() => setCurrentIndex(i)}
                animate={{
                  scale: currentIndex === i ? 0.95 : 1,
                  opacity: currentIndex === i ? 0.5 : 1
                }}
                className={`aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-50 border-2 ${currentIndex === i ? 'border-[#77C144]' : 'border-transparent'} cursor-pointer`}
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default WeddingApp;