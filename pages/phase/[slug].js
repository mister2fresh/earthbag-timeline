// pages/phase/[slug].js
import { getAllPhases, getPhaseBySlug } from '../../lib/phases'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from '../../components/Lightbox'

export default function PhasePage({ phase, allPhotos }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const openLightbox = (index) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextPhoto = () => {
    if (currentPhotoIndex < allPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1)
    }
  }

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-stone-900">
      {/* Header */}
      <header className="bg-stone-950 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-amber-600 hover:text-amber-500 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Timeline
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-2">
            {phase.title}
          </h1>
          <p className="text-xl text-amber-600 font-mono">
            {phase.date}
          </p>
        </div>
      </header>

      {/* Phase Description */}
      {phase.content && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-invert prose-stone max-w-none">
            <p className="text-lg text-stone-300 leading-relaxed">
              {phase.content}
            </p>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-stone-100 mb-8">
          Photo Gallery ({allPhotos.length} photos)
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPhotos.map((photo, index) => (
            <PhotoCard 
              key={photo.path} 
              photo={photo} 
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </section>

      {/* Navigation to Next/Previous Phase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center">
          <div>
            {phase.previousPhase && (
              <Link 
                href={`/phase/${phase.previousPhase.slug}`}
                className="inline-flex items-center text-amber-600 hover:text-amber-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous: {phase.previousPhase.title}
              </Link>
            )}
          </div>
          <div>
            {phase.nextPhase && (
              <Link 
                href={`/phase/${phase.nextPhase.slug}`}
                className="inline-flex items-center text-amber-600 hover:text-amber-500 transition-colors"
              >
                Next: {phase.nextPhase.title}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          photos={allPhotos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrevious={previousPhoto}
        />
      )}
    </div>
  )
}

// Individual photo card component
function PhotoCard({ photo, index, onClick }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div 
      className="group relative aspect-square bg-stone-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={photo.path}
        alt={`Photo ${index + 1}`}
        fill
        className={`object-cover transition-all duration-300 ${
          isLoading ? 'blur-sm' : 'blur-0 group-hover:scale-110'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoadingComplete={() => setIsLoading(false)}
      />
      
      {/* Photo number overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-stone-100 font-mono text-sm">
          Photo {index + 1}
        </p>
      </div>

      {/* Click hint on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/50 rounded-full p-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Generate static paths for all phases
export async function getStaticPaths() {
  const phases = getAllPhases()
  
  const paths = phases.map((phase) => ({
    params: { slug: phase.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

// Get phase data and photos
export async function getStaticProps({ params }) {
  const fs = require('fs')
  const path = require('path')
  
  // Get phase data
  const phase = getPhaseBySlug(params.slug)
  
  // Get all phases for navigation
  const allPhases = getAllPhases()
  const currentIndex = allPhases.findIndex(p => p.slug === params.slug)
  
  // Add previous/next phase info
  phase.previousPhase = currentIndex > 0 ? {
    slug: allPhases[currentIndex - 1].slug,
    title: allPhases[currentIndex - 1].title
  } : null
  
  phase.nextPhase = currentIndex < allPhases.length - 1 ? {
    slug: allPhases[currentIndex + 1].slug,
    title: allPhases[currentIndex + 1].title
  } : null
  
  // Get all photos for this phase
  const photosDirectory = path.join(process.cwd(), 'public', 'images', params.slug)
  let allPhotos = []
  
  try {
    const files = fs.readdirSync(photosDirectory)
    allPhotos = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => ({
        path: `/images/${params.slug}/${file}`,
        filename: file
      }))
      // Sort so cover.jpg comes first, then photo-1, photo-2, etc.
      .sort((a, b) => {
        if (a.filename === 'cover.jpg') return -1
        if (b.filename === 'cover.jpg') return 1
        return a.filename.localeCompare(b.filename)
      })
  } catch (error) {
    console.error(`No photos found for phase: ${params.slug}`)
  }

  return {
    props: {
      phase,
      allPhotos,
    },
  }
}