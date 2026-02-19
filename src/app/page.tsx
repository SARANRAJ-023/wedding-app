"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Logo from '@/assets/logo.png';

export default function SplashScreen() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash for 2.5 seconds, then trigger exit animation
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      <AnimatePresence
        mode='wait'
        onExitComplete={() => router.push('/startup-screen')}
      >
        {isVisible && (
          <motion.div
            key="splash-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center"
          >
            <div className="w-40 h-40 relative drop-shadow-2xl">
              <Image
                src={Logo}
                alt="Wedding App Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}