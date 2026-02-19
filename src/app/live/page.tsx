"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, Pause, Settings, Maximize, Volume2, VolumeX, SkipBack, SkipForward, ArrowRight, Users } from 'lucide-react';
import Image from 'next/image';
import LiveImage from '@/assets/5.live-streaming/live-streaming.png';
import { button, div } from 'framer-motion/client';

const LiveStreamComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle Loaded Metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Skip Time (Forward/Backward)
  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  // Toggle Playback Speed
  const toggleSpeed = () => {
    if (videoRef.current) {
      const newSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
      videoRef.current.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
    }
  };

  // Format Time Helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Video Source - Replace this with your actual video URL
  const VIDEO_SOURCE = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#26A69A] to-[#14B8A6] flex items-center justify-center p-4 font-sans text-slate-700">
      <div className="w-full max-w-md relative flex flex-col items-center">

        {/* Header */}
        <Link href="/home" className="w-full flex items-center justify-between px-6 py-8 text-white">
          <ChevronLeft className="cursor-pointer" size={32} strokeWidth={2.5} />
          <h1 className="text-4xl font-light tracking-tight">Live Streaming</h1>
          <div className="w-8" />
        </Link>
        {/* Ring Light Illustration Area */}
        {/* Ring Light Illustration Area */}
        <div className="relative w-64 h-64 mb-4 flex items-center justify-center">
          <Image
            src={LiveImage}
            alt="Live Streaming Illustration"
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Main Content Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white w-full rounded-[45px] p-4 flex flex-col items-center shadow-2xl"
        >
          <h2 className="text-[38px] leading-tight text-[#26A69A] font-light text-center">
            Let's Watch Live!
          </h2>
          <p className="text-gray-400 text-xl font-light mb-6 tracking-wide">
            Sabari Weds Samantha
          </p>

          {/* Video Player */}
          <div className="w-[350px] aspect-video bg-black rounded-sm relative group overflow-hidden shadow-md">
            <video
              ref={videoRef}
              src={VIDEO_SOURCE}
              className="w-full h-full object-cover"
              onClick={togglePlay}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />

            {/* Center Play Button Overlay */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform">
                  <Play size={40} fill="white" className="text-white ml-1" />
                </div>
              </div>
            )}

            {/* Video Controls Bar */}
            <div className={`absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-50 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {/* Progress Bar */}
              <div className="relative w-full h-1 bg-gray-600/60 mb-3 rounded-full group/progress cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div
                  className="absolute top-0 left-0 h-full bg-[#3EA6FF] rounded-full pointer-events-none"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#3EA6FF] rounded-full border-2 border-white shadow-sm scale-0 group-hover/progress:scale-100 transition-transform" />
                </div>
              </div>

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="hover:text-[#3EA6FF] transition-colors">
                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  </button>
                  <button onClick={() => skipTime(-10)} className="hover:text-[#3EA6FF] transition-colors">
                    <SkipBack size={20} fill="currentColor" className="text-white" />
                  </button>
                  <button onClick={() => skipTime(10)} className="hover:text-[#3EA6FF] transition-colors">
                    <SkipForward size={20} fill="currentColor" className="text-white" />
                  </button>
                  <button onClick={toggleMute} className="hover:text-[#3EA6FF] transition-colors">
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
                <div className="flex items-center gap-4 text-[12px] font-medium tracking-wide">
                  <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <button onClick={toggleSpeed} className="hover:text-[#3EA6FF] transition-colors" title={`Speed: ${playbackSpeed}x`}>
                    <Settings size={20} />
                  </button>
                  <button onClick={toggleFullscreen} className="hover:text-[#3EA6FF] transition-colors">
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="w-full mt-10 mb-4 px-2">
            <input
              type="text"
              placeholder="Your wish to the couple"
              className="w-full border-b border-gray-400 py-2 text-lg font-light italic outline-none text-gray-500 placeholder:text-gray-400 focus:border-[#26A69A] transition-colors"
            />
          </div>
        </motion.div>

        {/* Footer Link */}
        <button className="mt-8 flex items-center gap-3 text-white/90 hover:text-white transition-opacity">
          <Users size={32} strokeWidth={1.5} />
          <span className="text-xl font-light tracking-wide">Watch video with your friends</span>
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
            <ArrowRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default LiveStreamComponent;