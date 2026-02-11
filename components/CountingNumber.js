// components/CountingNumber.js
import { useState, useEffect } from 'react'

export default function CountingNumber({ 
  end, 
  duration = 1000, 
  delay = 0,
  decimals = 0,
  suffix = '',
  className = ''
}) {
  const [count, setCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768
    }
    
    if (checkMobile()) {
      setIsMobile(true)
      setCount(end) // Show final number immediately on mobile
    }
  }, [end])

  // Run animation only on desktop
  useEffect(() => {
    if (isMobile) return // Skip animation on mobile

    const delayTimer = setTimeout(() => {
      const steps = 30
      const stepDuration = duration / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        
        if (currentStep >= steps) {
          setCount(end)
          clearInterval(interval)
        } else {
          const progress = currentStep / steps
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          setCount(easedProgress * end)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [end, duration, delay, isMobile])

  // Format the number with commas
  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  return (
    <span className={className}>
      {formatNumber(count)}
      {suffix}
    </span>
  )
}
