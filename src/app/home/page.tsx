"use client"; // Required for Framer Motion

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Mail,
  Monitor,
  Play,
  Tv,
  BookHeart,
  Gift
} from "lucide-react";
import Img from "@/assets/1.Main-page/big.jpg";
import Logo from "@/assets/logo.png";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { scale: 0, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const buttonClickAnimation: Variants = {
  hover: { scale: 1.1, rotate: 2 },
  tap: { scale: 0.9, rotate: -2 },
};

export default function Home() {
  return (
    <main className="w-full h-screen flex justify-center bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md h-full bg-white relative overflow-hidden flex flex-col font-sans shadow-2xl md:rounded-xl"
      >

        {/* Top Right Logo - Gentle Fade In */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 right-6 z-20"
        >
          <div className="w-16 h-16 flex items-center justify-center">
            <Image
              src={Logo}
              alt="Logo"
              width={150}
              height={150}
              className="max-w-[90px] h-auto rounded-tl-xl rounded-br-xl"
            />
          </div>
        </motion.div>

        {/* Header Text - Slide down */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 px-6 z-10"
        >
          <h1 className="text-3xl font-light text-orange-400">
            Siva <span className="text-rose-400 font-normal">weds</span> Aishu
          </h1>
          <p className="text-xs text-gray-400 mt-1 tracking-wide">
            Let's flip the stories & create your memories...
          </p>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 relative mt-8">

          {/* Main Couple Image - Large Pop In */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="absolute left-[-40px] top-26 w-72 h-72 rounded-full border-4 border-white shadow-xl overflow-hidden z-10"
          >
            <Image src={Img} alt="Couple" fill className="object-cover" />
          </motion.div>

          {/* Menu Items Mapping for Cleaner Code */}
          {[
            { href: "/view?s=invitation", label: "E-Invitation", icon: Mail, color: "from-orange-400 to-rose-400", pos: "top-0 left-24" },
            { href: "/view?s=info", label: "Wedding Website", icon: Monitor, color: "from-purple-400 to-indigo-500", pos: "top-12 right-16" },
            { href: "/view?s=trailer", label: "Watch Trailer", icon: Play, color: "from-cyan-400 to-blue-500", pos: "top-44 right-6" },
            { href: "/view?s=gallery", label: "Flip Album", icon: BookHeart, color: "from-lime-400 to-green-500", pos: "top-[420px] left-40" },
            { href: "/view?s=gift", label: "Share your Gift", icon: Gift, color: "from-pink-400 to-rose-500", pos: "top-[480px] left-8" },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className={`absolute ${item.pos} flex flex-col items-center gap-2 z-20`}>
              <Link href={item.href}>
                <motion.button
                  variants={buttonClickAnimation}
                  whileHover="hover"
                  whileTap="tap"
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg text-white`}
                >
                  <item.icon size={28} strokeWidth={1.5} fill={item.icon === Play ? "currentColor" : "none"} />
                </motion.button>
              </Link>
              <span className="text-gray-400 font-light text-sm">{item.label}</span>
            </motion.div>
          ))}

          {/* Special Case: Live Streaming (Different Styling) */}
          <motion.div variants={itemVariants} className="absolute top-80 right-12 flex flex-col items-center gap-2 z-20">
            <Link href="/view?s=live">
              <motion.button
                variants={buttonClickAnimation}
                whileHover="hover"
                whileTap="tap"
                className="w-20 h-20 rounded-full bg-white border-2 border-teal-100 flex flex-col items-center justify-center shadow-lg text-teal-400"
              >
                <Tv size={32} strokeWidth={1.5} />
                <span className="text-[10px] font-bold mt-1">LIVE</span>
              </motion.button>
            </Link>
            <span className="text-teal-400 font-light text-sm">Live Streaming!</span>
          </motion.div>

        </div>

        {/* Animated Background Pulse */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-50 rounded-full blur-3xl pointer-events-none"
        />

        {/* Bottom wave */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1440 320" className="w-full h-auto opacity-10">
            <path fill="#000" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </motion.div>
    </main>
  );
}