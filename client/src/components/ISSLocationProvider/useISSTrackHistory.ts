import { useEffect, useRef, useState } from 'react'
import type { LatLngTuple } from 'leaflet'
import type { ISSData } from '../App/types'
import { calculateHeading } from './tools'

export const useIssTrackHistory = (rawPosition: ISSData | null) => {
  const [positions, setPositions] = useState<LatLngTuple[]>([])
  const [positionWithHeading, setPositionWithHeading] = useState<ISSData | null>(null)
  const lastTimestamp = useRef<number | null>(null)

  useEffect(() => {
    if (!rawPosition) return
    if (lastTimestamp.current && rawPosition.timestamp <= lastTimestamp.current) return

    const { latitude, longitude } = rawPosition
    const newPos: LatLngTuple = [latitude, longitude]

    let heading: number | undefined
    const prev = positions[positions.length - 1]

    if (prev) {
      heading = calculateHeading(prev[0], prev[1], latitude, longitude)
    }

    setPositions((prev) => [...prev, newPos])
    setPositionWithHeading({
      ...rawPosition,
      ...(heading !== undefined ? { heading } : {}),
    })

    lastTimestamp.current = rawPosition.timestamp
  }, [rawPosition, positions])

  return { position: positionWithHeading, positions }
}
