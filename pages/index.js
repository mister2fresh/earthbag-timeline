// pages/index.js
import { getAllPhases } from '../lib/phases'
import AnimatedStat from '../components/AnimatedStat'
import PhaseConstellation from '../components/PhaseConstellation'

export default function Home({ phases }) {
  return (
    <div className="min-h-screen">
      {/* Hero Section - From Earth to Home */}
      <section className="min-h-screen relative bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 flex flex-col items-center justify-center px-8 py-20">
        
        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold text-stone-100 text-center mb-8">
          From Dream to Reality
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-stone-400 text-center mb-20 max-w-2xl">
          Building an earthbag home from the ground up
        </p>

        {/* Animated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 w-full max-w-5xl">
          <AnimatedStat 
            end={2000} 
            duration={2000}
            delay={800}
            label="Bags of Earth"
          />
          <AnimatedStat 
            end={5000} 
            duration={1500}
            delay={3400}
            label="Feet of Barb Wire"
          />
          <AnimatedStat 
            end={1500} 
            duration={2000}
            delay={5500}
            label="Feet of Rebar"
          />
          <AnimatedStat 
            end={30} 
            duration={1500}
            delay={8100}
            label="Tons of Lava Rock"
          />
        </div>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-amber-600 italic font-light">
          Exponential Love
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
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
