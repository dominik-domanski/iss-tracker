import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ISSData } from '../App/types'
import { useMap } from 'react-leaflet'
import { useNightShadowLayer, useISSMapControl } from '../ISSMapDataAdapter/hooks'

interface ISSContextValue {
  position: ISSData | null
  lastUpdated: Date | null
  refreshPosition: () => void
}

const ISSContext = createContext<ISSContextValue | undefined>(undefined)

export const useISSLocation = (): ISSContextValue => {
  const context = useContext(ISSContext)
  if (!context) {
    throw new Error('useISS must be used within an ISSProvider')
  }
  return context
}

export const ISSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const map = useMap()

  const [position, setPosition] = useState<ISSData | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useNightShadowLayer(map)
  useISSMapControl(map, position)

  const fetchPosition = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/iss-location')
      const data = await res.json()
      const { latitude, longitude, timestamp, velocity } = data
      setPosition({
        latitude,
        longitude,
        timestamp,
        velocity,
      })
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Failed to fetch ISS position:', err)
    }
  }, [])

  useEffect(() => {
    fetchPosition() // Initial fetch
    const interval = setInterval(fetchPosition, 15000) // every 15 seconds
    return () => clearInterval(interval)
  }, [fetchPosition])

  return (
    <ISSContext.Provider value={{ position, lastUpdated, refreshPosition: fetchPosition }}>
      {children}
    </ISSContext.Provider>
  )
}
