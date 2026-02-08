// pages/index.js
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import PhaseConstellation from '../components/PhaseConstellation'

export default function Home({ phases }) {
  return (
    <div className="min-h-screen bg-stone-950">
      {/* Intro Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 text-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10 text-center px-8 max-w-5xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
            From Earth to Home
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-stone-400 mb-16 font-light">
            Building an earthship, one element at a time
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                2,000
              </div>
              <div className="text-sm md:text-base text-stone-400 uppercase tracking-wider">
                Bags of Earth
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="text-sm md:text-base text-stone-400 uppercase tracking-wider">
                Mile of Barb Wire
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                1,500
              </div>
              <div className="text-sm md:text-base text-stone-400 uppercase tracking-wider">
                Feet of Rebar
              </div>
            </div>

            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                30
              </div>
              <div className="text-sm md:text-base text-stone-400 uppercase tracking-wider">
                Tons of Lava Rock
              </div>
            </div>
          </div>

          {/* Exponential Love */}
          <div className="text-3xl md:text-4xl font-light text-amber-400 italic mb-12">
            Exponential Love
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 mx-auto text-stone-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Constellation Section - Now Extracted to Component */}
      <PhaseConstellation phases={phases} />
    </div>
  )
}

// Get static props
export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content')
  
  // Check if content directory exists
  if (!fs.existsSync(contentDir)) {
    return {
      props: {
        phases: []
      }
    }
  }
  
  const phaseFolders = fs.readdirSync(contentDir)
  
  const phaseData = phaseFolders
    .filter(folder => {
      // Only include folders that have a phase.md file
      const markdownPath = path.join(contentDir, folder, 'phase.md')
      return fs.existsSync(markdownPath)
    })
    .map(phaseSlug => {
      const markdownPath = path.join(contentDir, phaseSlug, 'phase.md')
      const fileContents = fs.readFileSync(markdownPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        slug: phaseSlug,
        excerpt: content.substring(0, 150) + '...',
        ...data
      }
    })
  
  // Sort by order
  phaseData.sort((a, b) => (a.order || 0) - (b.order || 0))
  
  return {
    props: {
      phases: phaseData
    }
  }
}