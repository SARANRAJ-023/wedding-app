"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import GiftImage from '@/assets/7.gift/gift.png';

const GiftPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D81B60] to-[#E91E63] flex flex-col items-center font-sans overflow-x-hidden">

      {/* Header Navigation */}
      <header className="w-full max-w-md flex items-center justify-between px-6 pt-10 pb-4 text-white">
        <Link href="/home">
          <button>
            <ChevronLeft size={32} strokeWidth={2.5} />
          </button>
        </Link>
        <h1 className="text-4xl font-light tracking-wide">Share Gift</h1>
        <div className="w-8" />
      </header>

      <main className="w-full max-w-md flex flex-col items-center px-4 relative">

        {/* 3. SHARE GIFT SCREEN */}
        <div className="w-full flex flex-col items-center">
          {/* 3D Gift Box Image */}
          <div className="relative w-80 h-72 mb-[-30px] z-10 flex items-center justify-center">
            <Image
              src={GiftImage}
              alt="Gift Box"
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div className="bg-white w-[350px] rounded-[45px] p-8 pb-30 pt-12 shadow-2xl flex flex-col items-center relative mt-[30px]">
            <h2 className="text-[38px] leading-tight text-black font-light mb-2">Let's Gift</h2>
            <p className="text-gray-500 text-lg mb-12 font-light">Vijay Kumar & Pooja Kumar</p>

            <div className="w-full space-y-8 mb-8">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Gift Amount"
                  className="w-full border-b border-gray-200 py-3 outline-none text-xl font-light text-gray-600 placeholder:text-gray-300"
                />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Your Wishes"
                  className="w-full border-b border-gray-200 py-3 outline-none text-xl font-light text-gray-600 placeholder:text-gray-300"
                />
              </div>
            </div>

            <button className="absolute bottom-6 w-20 h-20 bg-gradient-to-br from-[#F48FB1] to-[#E91E63] rounded-full shadow-lg shadow-pink-300/50 flex items-center justify-center text-white hover:scale-105 transition-transform">
              <ArrowRight size={36} strokeWidth={2.5} />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default GiftPage;