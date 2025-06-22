import { useEffect, useState } from 'react'
import L from 'leaflet'

import { generateMarkerHtml } from './tools'

export const useIssMarker = (heading: number, isConnected: boolean) => {
  const [icon, setIcon] = useState<L.DivIcon>()

  useEffect(() => {
    const newIcon = L.divIcon({
      html: generateMarkerHtml(heading, isConnected),
      className: '', // no default styles
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })

    setIcon(newIcon)
  }, [heading, isConnected])

  return {
    icon,
  }
}
