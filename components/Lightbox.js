// components/Lightbox.js
import { useEffect } from 'react'
import Image from 'next/image'

export default function Lightbox({ photos, currentIndex, onClose, onNext, onPrevious }) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNext, onPrevious])

  const currentPhoto = photos[currentIndex]
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 px-4 py-2 rounded-full">
        <p className="text-white font-mono text-sm">
          {currentIndex + 1} / {photos.length}
        </p>
      </div>

      {/* Previous button */}
      {hasPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all p-3 rounded-full hover:bg-white/10 hover:scale-110"
          aria-label="Previous photo"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-white transition-all p-3 rounded-full hover:bg-white/10 hover:scale-110"
          aria-label="Next photo"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main image container */}
      <div 
        className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <div 
          className="relative w-full h-full max-w-7xl max-h-full"
          onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
        >
          <Image
            src={currentPhoto.path}
            alt={`Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            quality={95}
            priority
          />
        </div>
      </div>

      {/* Keyboard hints (only show on desktop) */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-6 text-white/60 text-sm font-mono">
          <span>← →  Navigate</span>
          <span>ESC  Close</span>
        </div>
      </div>

      {/* Touch-friendly close area (mobile) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors px-6 py-2 rounded-full bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  )
}
