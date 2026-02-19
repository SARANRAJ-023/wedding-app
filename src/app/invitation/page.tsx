'use client'

import { ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Imginvite from '@/assets/2.Orange-Page/wedding-bubbles.png'

export default function WeddingInvitation() {
  const [hoveredButton, setHoveredButton] = useState(false)

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #E85D52 0%, #F07867 100%)'
    }}>
      {/* Diagonal stripe pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        // backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #E85D52 10px, #E85D52 20px)'
      }}></div>

      {/* Back Button */}
      <Link href="/home">
        <button className="absolute top-8 left-8 text-white hover:opacity-80 transition-opacity z-10">
          <ArrowLeft size={28} strokeWidth={1.5} />
        </button>
      </Link>

      {/* Main Container */}
      <div className="relative w-full max-w-md flex flex-col items-center px-6 py-12">
        {/* Mailbox 3D Illustration */}
        {/* Mailbox Image */}
        <div className="relative h-64 w-full flex items-center justify-center mb-8">
          <Image
            src={Imginvite}
            alt="Wedding Mailbox"
            className="h-full w-auto object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* White Card */}
        <div className="relative w-full bg-white rounded-3xl shadow-2xl p-8 text-center z-20">
          {/* Groom Name */}
          <h1 className="text-4xl font-light text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Lachuthan R
          </h1>

          {/* Weds Text */}
          <p className="text-lg text-gray-400 mb-2" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}>
            Weds
          </p>

          {/* Bride Name */}
          <h2 className="text-4xl font-light text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Mamitha Baiju
          </h2>

          {/* Invitation Message */}
          <p className="text-sm leading-relaxed text-gray-400 mb-8" style={{ fontFamily: 'Georgia, serif', lineHeight: '1.8' }}>
            We cordially invite you for our wedding and awaiting your presence. Your blessings are much important. Waiting to see you!
          </p>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: '#E85D52',
                boxShadow: hoveredButton ? '0 12px 24px rgba(232, 93, 82, 0.4)' : '0 8px 16px rgba(232, 93, 82, 0.3)',
                transform: hoveredButton ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Search size={24} color="white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
