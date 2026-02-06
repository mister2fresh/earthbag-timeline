import Image from 'next/image'
import Link from 'next/link'  // ← ADD THIS LINE
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ phases }) {
  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-4xl font-bold text-stone-800 mb-8">
        Earthship Timeline
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {phases.map(phase => (
    <Link href={`/phase/${phase.slug}`} key={phase.slug}>  
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
        <Image 
          src={phase.coverImage}
          alt={phase.title}
          width={600}
          height={400}
          className="w-full object-cover h-64"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-stone-800">
            {phase.title}
          </h2>
          <p className="mt-2 text-sm text-stone-500">{phase.date}</p>
          <p className="mt-4 text-stone-600">{phase.excerpt}</p>
        </div>
      </div>
      </Link>
      ))}
</div>
    </div>
  )
}

// This function runs at BUILD TIME on the server
export async function getStaticProps() {
  // Get the content directory
  const contentDir = path.join(process.cwd(), 'content')
  
  // Read all phase folders
  const phaseFolders = fs.readdirSync(contentDir)
  
  // Read each phase's markdown file
  const phaseData = phaseFolders.map(phaseSlug => {
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
  phaseData.sort((a, b) => a.order - b.order)
  
  return {
    props: {
      phases: phaseData
    }
  }
}