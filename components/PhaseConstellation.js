// components/PhaseConstellation.js
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PhaseConstellation({ phases }) {
  const [hoveredPhase, setHoveredPhase] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive positioning via JavaScript (safer than CSS)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    // Check on mount
    checkMobile()
    
    // Check on resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Position configuration - defined once, reusable
  const positions = {
    10: { 
      desktop: { top: '10%', left: '15%' },
      mobile: { top: '6%', left: '50%' }
    },
    20: { 
      desktop: { top: '25%', left: '70%' },
      mobile: { top: '21%', left: '50%' }
    },
    30: { 
      desktop: { top: '40%', left: '25%' },
      mobile: { top: '36%', left: '50%' }
    },
    40: { 
      desktop: { top: '55%', left: '75%' },
      mobile: { top: '51%', left: '50%' }
    },
    50: { 
      desktop: { top: '70%', left: '20%' },
      mobile: { top: '66%', left: '50%' }
    },
    60: { 
      desktop: { top: '85%', left: '65%' },
      mobile: { top: '81%', left: '50%' }
    },
  }

  // Connection lines configuration
  const connections = [
    { from: { x: '15%', y: '10%' }, to: { x: '70%', y: '25%' } },
    { from: { x: '70%', y: '25%' }, to: { x: '25%', y: '40%' } },
    { from: { x: '25%', y: '40%' }, to: { x: '75%', y: '55%' } },
    { from: { x: '75%', y: '55%' }, to: { x: '20%', y: '70%' } },
    { from: { x: '20%', y: '70%' }, to: { x: '65%', y: '85%' } },
  ]

  const mobileConnections = [
    { from: { x: '50%', y: '6%' }, to: { x: '50%', y: '21%' } },
    { from: { x: '50%', y: '21%' }, to: { x: '50%', y: '36%' } },
    { from: { x: '50%', y: '36%' }, to: { x: '50%', y: '51%' } },
    { from: { x: '50%', y: '51%' }, to: { x: '50%', y: '66%' } },
    { from: { x: '50%', y: '66%' }, to: { x: '50%', y: '81%' } },
  ]

  return (
    <section className="min-h-screen relative bg-stone-950 py-20">
      {/* Section Title */}
      <div className="text-center mb-16 px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          The Journey
        </h2>
        <p className="text-stone-400 text-lg">
          Explore each phase of the build
        </p>
      </div>

      {/* Constellation Container */}
      <div className="relative w-full h-[1100px] md:h-[900px] px-8 max-w-7xl mx-auto">
        
        {/* Desktop Connection Lines */}
        <svg 
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 1 }}
        >
          <defs>
            <marker 
              id="arrowhead" 
              markerWidth="10" 
              markerHeight="10" 
              refX="9" 
              refY="3" 
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="rgba(245, 158, 11, 0.5)" />
            </marker>
          </defs>
          {connections.map((conn, index) => (
            <line
              key={`desktop-line-${index}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="rgba(245, 158, 11, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead)"
            />
          ))}
        </svg>
        
        {/* Mobile Connection Lines */}
        <svg 
          className="md:hidden absolute inset-0 w-full h-full pointer-events-none" 
          style={{ zIndex: 1 }}
        >
          <defs>
            <marker 
              id="arrowhead-mobile" 
              markerWidth="10" 
              markerHeight="10" 
              refX="9" 
              refY="3" 
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="rgba(245, 158, 11, 0.5)" />
            </marker>
          </defs>
          {mobileConnections.map((conn, index) => (
            <line
              key={`mobile-line-${index}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="rgba(245, 158, 11, 0.4)"
              strokeWidth="2"
              strokeDasharray="5,5"
              markerEnd="url(#arrowhead-mobile)"
            />
          ))}
        </svg>
        
        {/* Phase Nodes */}
        {phases.map((phase) => {
          const position = positions[phase.order] || positions[10]
          const activePosition = isMobile ? position.mobile : position.desktop
          
          return (
            <Link 
              href={`/phase/${phase.slug}`} 
              key={phase.slug}
            >
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300"
                style={{ 
                  top: activePosition.top,
                  left: activePosition.left,
                  zIndex: hoveredPhase === phase.slug ? 20 : 10
                }}
                onMouseEnter={() => setHoveredPhase(phase.slug)}
                onMouseLeave={() => setHoveredPhase(null)}
              >

                {/* Node Circle with Image - INCREASED SIZE */}
                <div className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 transition-all duration-300 shadow-2xl ${
                  hoveredPhase === phase.slug 
                    ? 'border-amber-400 ring-4 ring-amber-500/50 scale-110' 
                    : 'border-amber-600'
                }`}>
                  <Image
                    src={phase.coverImage}
                    alt={phase.title}
                    fill
                    sizes="(max-width: 768px) 160px, 208px"
                    className={`object-cover transition-all duration-300 ${
                      hoveredPhase === phase.slug ? 'scale-110 brightness-110' : 'scale-100'
                    }`}
                  />
                  
                  {/* Overlay with Title and Date */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-end pb-4 px-2">
                    <span className="text-white font-bold text-sm md:text-base text-center leading-tight">
                      {phase.title}
                    </span>
                    <span className="text-amber-400 text-xs md:text-sm mt-1">
                      {phase.date}
                    </span>
                  </div>
                  
                  {/* Start Here indicator for first phase */}
                  {phase.order === 10 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap animate-pulse">
                      START HERE
                    </div>
                  )}
                </div>

                {/* Info Card - Shows on Hover */}
                <div className={`absolute top-full mt-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                  hoveredPhase === phase.slug 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}>
                  <div className="bg-stone-800 border border-amber-500/50 rounded-lg p-4 shadow-2xl min-w-[200px] max-w-[280px]">
                    <p className="text-stone-400 text-xs leading-relaxed line-clamp-3">
                      {phase.excerpt}
                    </p>
                    <div className="mt-3 flex items-center text-amber-500 text-sm font-medium">
                      Explore Phase
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Pulse Animation on Node */}
                {hoveredPhase === phase.slug && (
                  <div className="absolute inset-0 rounded-full border-2 border-amber-500 animate-ping"></div>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Legend */}
      <div className="text-center mt-16 text-stone-500 text-sm">
        <p>Hover over each phase to learn more • Click to explore in detail</p>
      </div>
    </section>
  )
}
