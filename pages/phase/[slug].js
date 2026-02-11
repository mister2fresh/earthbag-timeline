// pages/phase/[slug].js
import { getAllPhases, getPhaseBySlug } from '../../lib/phases'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from '../../components/Lightbox'

export default function PhasePage({ phase, galleryPhotos, coverPhoto }) {
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
    if (currentPhotoIndex < galleryPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1)
    }
  }

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1612' }}>
      
      {/* Navigation Bar */}
      <nav 
        className="sticky top-0 z-50 border-b"
        style={{ 
          backgroundColor: 'rgba(26, 22, 18, 0.95)',
          borderColor: 'rgba(196, 149, 106, 0.2)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center transition-colors"
            style={{ 
              color: '#c4956a',
              fontFamily: "'Cormorant Garamond', Georgia, serif"
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Timeline
          </Link>
        </div>
      </nav>

      {/* Hero Section with Cover Photo */}
      <section className="relative">
        {/* Cover Photo */}
        {coverPhoto && (
          <div className="relative h-[50vh] md:h-[60vh] w-full">
            <Image
              src={coverPhoto.path}
              alt={phase.title}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(26, 22, 18, 0.3) 0%, rgba(26, 22, 18, 0.6) 60%, rgba(26, 22, 18, 1) 100%)'
              }}
            />
          </div>
        )}
        
        {/* Title Content - Overlapping the image */}
        <div 
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ marginTop: coverPhoto ? '-120px' : '0' }}
        >
          <div className="text-center">
            {/* Phase number badge */}
            <div 
              className="inline-block px-4 py-1 rounded-full text-sm mb-6"
              style={{
                backgroundColor: 'rgba(212, 165, 116, 0.2)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                color: '#d4a574',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              Phase {phase.order / 10}
            </div>
            
            {/* Title */}
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-4"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#f5ebe0'
              }}
            >
              {phase.title}
            </h1>
            
            {/* Date */}
            <p 
              className="text-lg md:text-xl mb-8"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#c4956a'
              }}
            >
              {phase.date}
            </p>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c4956a]" />
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#c4956a' }}
              />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c4956a]" />
            </div>
          </div>
        </div>
      </section>

      {/* Phase Description */}
      {phase.content && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p 
            className="text-lg md:text-xl leading-relaxed text-center"
            style={{ 
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: '#a89a8a'
            }}
          >
            {phase.content}
          </p>
        </section>
      )}

      {/* Photo Gallery */}
      {galleryPhotos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Gallery Header */}
          <div className="text-center mb-12">
            <p 
              className="text-sm tracking-[0.4em] uppercase mb-4"
              style={{ 
                color: '#8a7560',
                fontFamily: "'Cormorant Garamond', Georgia, serif"
              }}
            >
              Explore the Build
            </p>
            <h2 
              className="text-3xl md:text-4xl font-light mb-2"
              style={{ 
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: '#f5ebe0'
              }}
            >
              Photo Gallery
            </h2>
            <p 
              className="text-sm"
              style={{ 
                color: '#8a7560',
                fontFamily: "'Cormorant Garamond', Georgia, serif"
              }}
            >
              {galleryPhotos.length} photos
            </p>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryPhotos.map((photo, index) => (
              <PhotoCard 
                key={photo.path} 
                photo={photo} 
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Navigation to Next/Previous Phase */}
      <section 
        className="border-t"
        style={{ borderColor: 'rgba(196, 149, 106, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div>
              {phase.previousPhase && (
                <Link 
                  href={`/phase/${phase.previousPhase.slug}`}
                  className="group inline-flex flex-col"
                >
                  <span 
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ 
                      color: '#8a7560',
                      fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}
                  >
                    ← Previous
                  </span>
                  <span 
                    className="text-lg transition-colors group-hover:text-[#d4a574]"
                    style={{ 
                      color: '#c4956a',
                      fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}
                  >
                    {phase.previousPhase.title}
                  </span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {phase.nextPhase && (
                <Link 
                  href={`/phase/${phase.nextPhase.slug}`}
                  className="group inline-flex flex-col items-end"
                >
                  <span 
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ 
                      color: '#8a7560',
                      fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}
                  >
                    Next →
                  </span>
                  <span 
                    className="text-lg transition-colors group-hover:text-[#d4a574]"
                    style={{ 
                      color: '#c4956a',
                      fontFamily: "'Cormorant Garamond', Georgia, serif"
                    }}
                  >
                    {phase.nextPhase.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8">
        <Link 
          href="/"
          className="inline-flex items-center transition-colors hover:text-[#d4a574]"
          style={{ 
            color: '#8a7560',
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Return to Timeline
        </Link>
      </footer>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          photos={galleryPhotos}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrevious={previousPhoto}
        />
      )}
    </div>
  )
}

// Individual photo card component - NO BLUR STATE, simpler and more reliable
function PhotoCard({ photo, index, onClick }) {
  return (
    <div 
      className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        backgroundColor: '#2a2420',
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
      }}
      onClick={onClick}
    >
      <Image
        src={photo.path}
        alt={`Photo ${index + 1}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      
      {/* Hover overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(26, 22, 18, 0.8) 0%, transparent 50%)'
        }}
      />
      
      {/* Photo number - shows on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p 
          className="text-sm"
          style={{ 
            color: '#c4956a',
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}
        >
          Photo {index + 1}
        </p>
      </div>

      {/* Expand icon - shows on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div 
          className="rounded-full p-3"
          style={{ backgroundColor: 'rgba(26, 22, 18, 0.7)' }}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="#d4a574" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
      
      {/* Subtle border on hover */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: '1px solid rgba(196, 149, 106, 0.3)'
        }}
      />
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
      .sort((a, b) => {
        // Natural sort: extract numbers and compare numerically
        const numA = parseInt(a.filename.match(/\d+/)?.[0] || '0', 10)
        const numB = parseInt(b.filename.match(/\d+/)?.[0] || '0', 10)
        return numA - numB
      })
  } catch (error) {
    console.error(`No photos found for phase: ${params.slug}`)
  }

  // Separate cover photo from gallery photos
  const coverPhoto = allPhotos.find(p => p.filename.toLowerCase() === 'cover.jpg') || null
  const galleryPhotos = allPhotos.filter(p => p.filename.toLowerCase() !== 'cover.jpg')

  return {
    props: {
      phase,
      coverPhoto,
      galleryPhotos,
    },
  }
}