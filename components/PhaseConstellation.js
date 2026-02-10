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
    <section className="min-h-screen relative py-20 overflow-hidden">
      
      {/* Background - matching hero */}
      <div className="absolute inset-0 bg-[#1a1612]" />
      
      {/* Warm gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 50% at 50% 30%, rgba(180, 100, 50, 0.1) 0%, transparent 60%)'
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Organic curved lines - continuing from hero */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0,100 Q250,50 500,80 T1000,40" fill="none" stroke="#c4956a" strokeWidth="0.8" />
        <path d="M0,200 Q300,150 600,180 T1000,140" fill="none" stroke="#c4956a" strokeWidth="0.6" />
        <path d="M0,800 Q200,750 450,780 T1000,740" fill="none" stroke="#c4956a" strokeWidth="0.6" />
        <path d="M0,900 Q350,850 650,880 T1000,840" fill="none" stroke="#c4956a" strokeWidth="0.5" />
      </svg>

      {/* Section Title */}
      <div className="relative z-10 text-center mb-16 px-8">
        <p 
          className="text-sm tracking-[0.4em] uppercase mb-4"
          style={{ 
            color: '#8a7560',
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}
        >
          Follow the Path
        </p>
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
          style={{ 
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#f5ebe0'
          }}
        >
          The Journey
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#c4956a]" />
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#c4956a' }}
          />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#c4956a]" />
        </div>
      </div>

      {/* Constellation Container */}
      <div className="relative z-10 w-full h-[1100px] md:h-[900px] px-8 max-w-7xl mx-auto">
        
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
              <polygon points="0 0, 10 3, 0 6" fill="rgba(196, 149, 106, 0.6)" />
            </marker>
          </defs>
          {connections.map((conn, index) => (
            <line
              key={`desktop-line-${index}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="rgba(196, 149, 106, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="8,6"
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
              <polygon points="0 0, 10 3, 0 6" fill="rgba(196, 149, 106, 0.6)" />
            </marker>
          </defs>
          {mobileConnections.map((conn, index) => (
            <line
              key={`mobile-line-${index}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="rgba(196, 149, 106, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="8,6"
              markerEnd="url(#arrowhead-mobile)"
            />
          ))}
        </svg>
        
        {/* Phase Nodes */}
        {phases.map((phase) => {
          const position = positions[phase.order] || positions[10]
          const activePosition = isMobile ? position.mobile : position.desktop
          const isHovered = hoveredPhase === phase.slug
          
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
                  zIndex: isHovered ? 20 : 10
                }}
                onMouseEnter={() => setHoveredPhase(phase.slug)}
                onMouseLeave={() => setHoveredPhase(null)}
              >

                {/* Node Circle with Image */}
                <div 
                  className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    border: isHovered ? '3px solid #d4a574' : '3px solid #8a7560',
                    boxShadow: isHovered 
                      ? '0 0 40px rgba(212, 165, 116, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                  }}
                >
                  <Image
                    src={phase.coverImage}
                    alt={phase.title}
                    fill
                    sizes="(max-width: 768px) 160px, 208px"
                    className="object-cover transition-all duration-300"
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
                    }}
                  />
                  
                  {/* Overlay with Title and Date */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-end pb-4 px-3"
                    style={{
                      background: 'linear-gradient(to top, rgba(26, 22, 18, 0.95) 0%, rgba(26, 22, 18, 0.6) 50%, transparent 100%)'
                    }}
                  >
                    <span 
                      className="text-center leading-tight text-sm md:text-base"
                      style={{ 
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: '#f5ebe0',
                        fontWeight: 500
                      }}
                    >
                      {phase.title}
                    </span>
                    <span 
                      className="text-xs md:text-sm mt-1"
                      style={{ 
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: '#c4956a'
                      }}
                    >
                      {phase.date}
                    </span>
                  </div>
                  
                  {/* Start Here indicator for first phase */}
                  {phase.order === 10 && (
                    <div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap animate-pulse"
                      style={{
                        backgroundColor: '#d4a574',
                        color: '#1a1612',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}
                    >
                      Start Here
                    </div>
                  )}
                </div>

                {/* Info Card - Shows on Hover */}
                <div 
                  className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered 
                      ? 'translateX(-50%) translateY(0)' 
                      : 'translateX(-50%) translateY(8px)',
                    pointerEvents: isHovered ? 'auto' : 'none'
                  }}
                >
                  <div 
                    className="rounded-lg p-4 min-w-[200px] max-w-[280px]"
                    style={{
                      backgroundColor: 'rgba(26, 22, 18, 0.95)',
                      border: '1px solid rgba(196, 149, 106, 0.3)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <p 
                      className="text-xs leading-relaxed line-clamp-3"
                      style={{ 
                        color: '#8a7560',
                        fontFamily: "'Cormorant Garamond', Georgia, serif"
                      }}
                    >
                      {phase.excerpt}
                    </p>
                    <div 
                      className="mt-3 flex items-center text-sm"
                      style={{ 
                        color: '#d4a574',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 500
                      }}
                    >
                      Explore Phase
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Subtle glow on hover */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
                    style={{
                      border: '2px solid rgba(212, 165, 116, 0.4)',
                      boxShadow: '0 0 30px rgba(212, 165, 116, 0.2)'
                    }}
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Legend */}
      <div className="relative z-10 text-center mt-16 text-sm">
        <p 
          style={{ 
            color: '#5a4a3a',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.05em'
          }}
        >
          Hover over each phase to learn more • Click to explore in detail
        </p>
      </div>
    </section>
  )
}
