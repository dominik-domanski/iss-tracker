import { useEffect, useRef, useState } from 'react'
import { type LatLngTuple, latLng } from 'leaflet'

import type { ISSData } from '../App/types'

export const useISSMapControl = (map: L.Map | null, latestPosition: ISSData | null, hasPath: boolean) => {
  const [mapCenter, setMapCenter] = useState<LatLngTuple | null>(null)
  const hasZoomedForPath = useRef(false)

  useEffect(() => {
    if (latestPosition && !mapCenter) {
      setMapCenter([latestPosition.latitude, latestPosition.longitude])
    }
  }, [latestPosition, mapCenter])

  useEffect(() => {
    if (map && mapCenter) {
      map.setView(mapCenter)
    }
  }, [map, mapCenter])

  useEffect(() => {
    if (!latestPosition || !map) return

    const issLatLng = latLng(latestPosition.latitude, latestPosition.longitude)
    if (!map.getBounds().contains(issLatLng)) {
      map.setView(issLatLng)
    }
  }, [latestPosition, map])

  useEffect(() => {
    if (!map || !hasPath || hasZoomedForPath.current) return

    hasZoomedForPath.current = true
    map.setZoom(4)
  }, [hasPath, map])
}
