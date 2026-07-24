import { useEffect, useState } from 'react'

// Wedding date: June 1, 2027, 8:00 PM
const TARGET_DATE = new Date('2027-06-01T20:00:00')

function getTimeRemaining() {
  const total = TARGET_DATE.getTime() - new Date().getTime()
  const clamped = Math.max(total, 0)

  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    isComplete: total <= 0
  }
}

export default function useCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return timeLeft
}
