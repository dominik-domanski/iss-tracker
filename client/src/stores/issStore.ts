import { create } from 'zustand'

import type { LatLngTuple } from 'leaflet'
import type { ISSData } from '../components/App/types'
import { calculateHeading } from './tools'

type State = {
  latestPosition: ISSData | null
  positions: LatLngTuple[]
  isConnected: boolean
  setConnectionStatus: (status: boolean) => void
  addPosition: (data: ISSData) => void
  reset: () => void
}

export const useISSStore = create<State>((set, get) => ({
  latestPosition: null,
  positions: [],
  isConnected: false,

  setConnectionStatus: (status) => set({ isConnected: status }),

  addPosition: (data) => {
    const { latestPosition, positions } = get()

    if (latestPosition && data.timestamp <= latestPosition.timestamp) return

    const newPosition: LatLngTuple = [data.latitude, data.longitude]
    const updatedPositions = [...positions, newPosition]

    let heading: number | undefined = undefined
    if (positions.length > 0) {
      const [prevLat, prevLng] = positions[positions.length - 1]
      heading = calculateHeading(prevLat, prevLng, data.latitude, data.longitude)
    }

    set({
      positions: updatedPositions,
      latestPosition: {
        ...data,
        ...(heading !== undefined ? { heading } : {}),
      },
    })
  },

  reset: () => set({ latestPosition: null, positions: [], isConnected: false }),
}))
