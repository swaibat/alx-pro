import { useState, useEffect, useCallback } from 'react'

export const useTimer = (initialTime, onComplete) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  const formatTime = value => (value < 10 ? `0${value}` : value.toString())

  const startTimer = useCallback(() => {
    setTime(initialTime)
    setIsRunning(true)
  }, [initialTime])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalId)
          setIsRunning(false)
          if (onComplete) onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, onComplete])

  return { time: formatTime(time), isRunning, startTimer, stopTimer }
}
