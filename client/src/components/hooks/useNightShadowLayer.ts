import type { Map } from 'leaflet'
import Terminator from '@joergdietrich/leaflet.terminator'
import { useEffect } from 'react'

const terminator = new Terminator({
  color: 'black',
  fillColor: 'black',
  fillOpacity: 0.3,
  weight: 0,
})

const LAYER_UPDATE_INTERVAL = 60

export const useNightShadowLayer = (map?: Map) => {
  useEffect(() => {
    if (!map) return

    terminator.addTo(map)
    const interval = setInterval(() => {
      terminator.setTime(new Date())
      terminator.redraw()
    }, LAYER_UPDATE_INTERVAL * 1000)

    return () => {
      clearInterval(interval)
      map.removeLayer(terminator)
    }
  }, [map])
}
