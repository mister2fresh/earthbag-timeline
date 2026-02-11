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

  useEffect(() => {
    // Wait for delay before starting
    const delayTimer = setTimeout(() => {
      const steps = 30 // Number of steps in the animation
      const stepDuration = duration / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        
        if (currentStep >= steps) {
          setCount(end)
          clearInterval(interval)
        } else {
          // Ease-out effect: faster at start, slower at end
          const progress = currentStep / steps
          const easedProgress = 1 - Math.pow(1 - progress, 3)
          setCount(easedProgress * end)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [end, duration, delay])

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