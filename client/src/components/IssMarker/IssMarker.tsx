import { memo } from 'react'
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker'

import { useIssMarker } from './useIssMarker'
import type { LatLngExpression } from 'leaflet'

type IssMarkerProps = {
  position: LatLngExpression
  heading: number
  isConnected: boolean
}

export const IssMarker = memo<IssMarkerProps>(({ position, heading, isConnected }) => {
  const { icon } = useIssMarker(heading, isConnected)

  return icon && <ReactLeafletDriftMarker duration={500} icon={icon} position={position} />
})
