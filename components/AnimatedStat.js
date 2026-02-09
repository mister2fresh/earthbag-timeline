// components/AnimatedStat.js
import { useState, useEffect } from 'react'
import CountingNumber from './CountingNumber'

export default function AnimatedStat({ end, duration, delay, label }) {
  const [isVisible, setIsVisible] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Trigger particle burst when stat appears
      setTimeout(() => setShowParticles(true), 100)
      setTimeout(() => setShowParticles(false), 800)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="relative">
      <div 
        className={`group transition-all duration-500 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Number with monospace font */}
        <div 
          className="text-5xl md:text-6xl font-bold mb-2 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(232,156,49,0.6)]"
          style={{ 
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            background: 'linear-gradient(135deg, #E89C31 0%, #C45A28 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          <CountingNumber 
            end={end} 
            duration={duration}
            delay={delay + 300}
          />
        </div>

        {/* Label with clean sans */}
        <div 
          className="text-xs md:text-sm text-[#D4A59A]/70 uppercase tracking-[0.2em] font-medium"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </div>
      </div>

      {/* Dust particle effect on appear */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#E89C31] rounded-full animate-[particleBurst_0.8s_ease-out_forwards]"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 72}deg)`,
                '--particle-distance': '40px',
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
