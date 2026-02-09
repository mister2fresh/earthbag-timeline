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
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    // Wait for delay before starting count
    const startTimer = setTimeout(() => {
      setHasStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    const startValue = 0
    const endValue = end

    // Easing function (ease-out cubic) - fast start, slow end
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3)
    }

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easeOutCubic(progress)
      const currentValue = startValue + (endValue - startValue) * easedProgress

      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(endValue) // Ensure we end at exact value
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  // Format the number with commas and decimals
  const formatNumber = (num) => {
    return num.toLocaleString('en-US', {
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
