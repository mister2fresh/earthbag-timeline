// components/AnimatedStat.js
import { useState, useEffect } from 'react'
import CountingNumber from './CountingNumber'

export default function AnimatedStat({ end, duration, delay, label }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className="relative group">
      <div 
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease-out'
        }}
      >
        {/* Decorative top line */}
        <div 
          className="mx-auto mb-4 transition-all duration-500 group-hover:w-12"
          style={{ 
            width: '32px',
            height: '1px',
            backgroundColor: '#8a7560' 
          }}
        />
        
        {/* Number */}
        <div 
          className="mb-3 transition-all duration-300 group-hover:scale-105"
          style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#f5ebe0',
            letterSpacing: '-0.02em',
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 300
          }}
        >
          <CountingNumber 
            end={end} 
            duration={duration}
            delay={delay + 200}
          />
        </div>

        {/* Label */}
        <div 
          style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#8a7560',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            lineHeight: 1.6
          }}
        >
          {label}
        </div>
        
        {/* Decorative bottom line */}
        <div 
          className="mx-auto mt-4 transition-all duration-500 group-hover:w-8"
          style={{ 
            width: '16px',
            height: '1px',
            backgroundColor: '#5a4a3a' 
          }}
        />
      </div>
    </div>
  )
}