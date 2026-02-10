// pages/index.js
import { getAllPhases } from '../lib/phases'
import AnimatedStat from '../components/AnimatedStat'
import PhaseConstellation from '../components/PhaseConstellation'

export default function Home({ phases }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Warm Handcrafted Aesthetic */}
      <section className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-8 py-20">
        
        {/* Layered Background */}
        <div className="absolute inset-0 bg-[#1a1612]" />
        
        {/* Warm gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180, 100, 50, 0.15) 0%, transparent 60%)'
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
        
        {/* Organic curved lines - like contour lines of earth */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <path 
            d="M0,600 Q250,500 500,550 T1000,500" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="1"
          />
          <path 
            d="M0,650 Q300,580 600,620 T1000,580" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="0.8"
          />
          <path 
            d="M0,700 Q200,650 450,680 T1000,640" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="0.6"
          />
          <path 
            d="M0,750 Q350,700 650,730 T1000,700" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="0.5"
          />
          <path 
            d="M0,300 Q200,250 500,280 T1000,220" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="0.5"
          />
          <path 
            d="M0,350 Q280,300 550,340 T1000,290" 
            fill="none" 
            stroke="#c4956a" 
            strokeWidth="0.6"
          />
        </svg>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Small intro text */}
          <p 
            className="text-sm md:text-base tracking-[0.4em] uppercase mb-8"
            style={{ 
              color: '#c4956a',
              fontFamily: "'Cormorant Garamond', Georgia, serif"
            }}
          >
            A Story Written in Earth
          </p>
          
          {/* Main Title */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] mb-6"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: '#f5ebe0'
            }}
          >
            From Earth
            <span 
              className="block text-4xl md:text-5xl lg:text-6xl italic mt-2"
              style={{ color: '#d4a574' }}
            >
              to Home
            </span>
          </h1>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 my-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c4956a]" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4956a]">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c4956a]" />
          </div>

          {/* Stats - Handcrafted Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            <AnimatedStat 
              end={2000} 
              duration={2000}
              delay={800}
              label="Bags of Earth"
            />
            <AnimatedStat 
              end={5500} 
              duration={1500}
              delay={1200}
              label="Feet of Barb Wire"
            />
            <AnimatedStat 
              end={1500} 
              duration={2000}
              delay={1600}
              label="Feet of Rebar"
            />
            <AnimatedStat 
              end={30} 
              duration={1500}
              delay={2000}
              label="Tons of Lava Rock"
            />
          </div>

          {/* Tagline */}
          <p 
            className="text-3xl md:text-4xl lg:text-5xl mb-24"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 300,
              color: '#d4a574'
            }}
          >
            Exponential Love
          </p>
          
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <span 
              className="text-xs tracking-[0.3em] uppercase"
              style={{ 
                color: '#8a7560',
                fontFamily: "'Cormorant Garamond', Georgia, serif"
              }}
            >
              Explore
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[#c4956a] to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* Phase Constellation */}
      <PhaseConstellation phases={phases} />
    </div>
  )
}

export async function getStaticProps() {
  const phases = getAllPhases()
  
  // Add excerpt field for hover cards (first 150 chars of content)
  const phasesWithExcerpts = phases.map(phase => ({
    ...phase,
    excerpt: phase.content 
      ? phase.content.substring(0, 150) + (phase.content.length > 150 ? '...' : '')
      : 'Click to explore this phase of the build.'
  }))

  return {
    props: {
      phases: phasesWithExcerpts,
    },
  }
}