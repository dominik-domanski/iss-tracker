import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useMap } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

import { useFetchLocation } from './useFetchLocation'
import type { ISSData } from '../App/types'

import { useIssTrackHistory } from './useISSTrackHistory'
import { useISSMapControl, useNightShadowLayer } from '../hooks'

type IssLocationContextType = {
  position: ISSData | null
  positions: LatLngTuple[]
  error: string | null
  loading: boolean
  refresh: () => void
}

const FETCH_INTERVAL = 5 // seconds

const IssLocationContext = createContext<IssLocationContextType | undefined>(undefined)

export const IssLocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const map = useMap()
  const { position: rawPosition, error, fetchLocation, loading } = useFetchLocation()

  useNightShadowLayer(map)

  const { position, positions } = useIssTrackHistory(rawPosition)

  useISSMapControl(map, rawPosition, positions.length > 1)

  // Start periodic fetching
  useEffect(() => {
    fetchLocation()
    const interval = setInterval(fetchLocation, FETCH_INTERVAL * 1000)
    return () => clearInterval(interval)
  }, [fetchLocation])

  const contextValue = useMemo(
    () => ({
      position,
      positions,
      error,
      loading,
      refresh: fetchLocation,
    }),
    [position, positions, error, loading, fetchLocation],
  )

  return <IssLocationContext.Provider value={contextValue}>{children}</IssLocationContext.Provider>
}

export const useISSLocation = (): IssLocationContextType => {
  const context = useContext(IssLocationContext)
  if (!context) {
    throw new Error('useISSLocation must be used within an IssLocationProvider')
  }
  return context
}
