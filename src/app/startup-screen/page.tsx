"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Assets from your provided structure
import CreateEventImg from '@/assets/1.Main-page/wedding-invitation.png';
import StreamJoyImg from '@/assets/1.Main-page/watch-trailer.png';
import GiftWishImg from '@/assets/1.Main-page/gift.png';

const onboardingData = [
  {
    id: 0,
    title: <>Create Event & <br /> Invite Loved Ones</>,
    desc: "Let's create an event & invite people who you love to attend",
    img: CreateEventImg,
    gradient: "from-[#8E2DE2] to-[#4A00E0]",
    btnColor: "bg-[#8E2DE2]",
  },
  {
    id: 1,
    title: <>Stream Event & <br /> Share your Joy</>,
    desc: "Schedule live streaming to make your loved ones connect virtually",
    img: StreamJoyImg,
    gradient: "from-[#E55D54] to-[#D32F2F]",
    btnColor: "bg-[#F06256]",
  },
  {
    id: 2,
    title: <>Get & Give Gifts <br /> as You Wish</>,
    desc: "Gift your preferred amount to your bestie & show ur love",
    img: GiftWishImg,
    gradient: "from-[#2BAE95] to-[#1F9B88]",
    btnColor: "bg-[#42D1B8]",
  }
];

const InteractiveOnboarding = () => {
  const router = useRouter();
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    const user = localStorage.getItem('userProfile');
    if (user) {
      router.push('/dashboard');
    }
  }, []);

  const paginate = (newDirection: number) => {
    const nextStep = page + newDirection;
    if (nextStep >= 0 && nextStep < onboardingData.length) {
      setPage([nextStep, newDirection]);
    } else if (newDirection > 0 && nextStep === onboardingData.length) {
      router.push('/sign-up');
    }
  };

  const setStep = (newStep: number) => {
    setPage([newStep, newStep > page ? 1 : -1]);
  };

  // Variants for smooth directional sliding
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-700 bg-gradient-to-br ${onboardingData[page].gradient} font-sans overflow-hidden flex flex-col items-center`}
    >

      {/* Header / Skip */}
      <div className="w-full max-w-md flex justify-end px-6 pt-10 pb-2">
        <button onClick={() => router.push('/sign-up')} className="text-white/60 text-2xl font-light active:opacity-40 transition-opacity">Skip</button>
      </div>

      <main className="w-full max-w-md flex flex-col items-center px-4 relative flex-1">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50;
              if (swipe && offset.x > 0) paginate(-1);
              else if (swipe && offset.x < 0) paginate(1);
            }}
            className="w-[380px] flex flex-col items-center absolute"
          >

            <div className="h-64 flex items-center justify-center relative w-full mb-4 cursor-grab active:cursor-grabbing">
              <Image
                src={onboardingData[page].img}
                alt="Onboarding"
                width={350}
                height={250}
                className="object-contain pointer-events-none"
                priority
              />
            </div>

            {/* Content Card */}
            <div className="bg-white w-full rounded-[45px] p-8 shadow-2xl flex flex-col items-center min-h-[410px] mt-10">
              <div className="text-center py-6">
                <h2 className="text-[36px] font-normal leading-tight text-gray-800 mb-6">
                  {onboardingData[page].title}
                </h2>
                <p className="text-gray-400 text-xl font-light leading-relaxed px-2">
                  {onboardingData[page].desc}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => paginate(1)}
                className={`mt-8 w-24 h-24 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:scale-105 active:scale-95 transition-all ${onboardingData[page].btnColor}`}
              >
                <ArrowRight size={44} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pagination Indicators - Fixed at bottom */}
      <div className="pb-12 flex flex-col items-center w-full z-50">
        <div className="flex gap-3 mb-2">
          {onboardingData.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${page === i ? "bg-black/50 scale-125" : "bg-black/10 hover:bg-black/20"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveOnboarding;