'use client'

import { useState, useRef, useEffect } from 'react'

interface RadioStation {
  id: number
  name: string
  streamUrl: string
}

export function useRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.preload = 'none'
    
    const audio = audioRef.current
    
    const handleCanPlay = () => setIsLoading(false)
    const handleLoadStart = () => setIsLoading(true)
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('error', handleError)
      audio.pause()
    }
  }, [])

  const playStation = async (station: RadioStation) => {
    if (!audioRef.current) return

    try {
      if (currentStation?.id === station.id && isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        return
      }

      setIsLoading(true)
      audioRef.current.src = station.streamUrl
      await audioRef.current.play()
      setCurrentStation(station)
      setIsPlaying(true)
    } catch (error) {
      console.error('Erro ao reproduzir rádio:', error)
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setIsPlaying(false)
    setCurrentStation(null)
    setIsLoading(false)
  }

  return {
    isPlaying,
    currentStation,
    isLoading,
    playStation,
    stopPlayback
  }
}