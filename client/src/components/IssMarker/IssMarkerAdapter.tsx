import { useISSLocation } from '../ISSLocationProvider'
import { IssMarker } from './IssMarker'

export const IssMarkerAdapter = () => {
  const { position, error } = useISSLocation()

  if (!position) {
    return null
  }

  const { heading, latitude, longitude } = position

  return <IssMarker isConnected={!error} heading={heading || 0} position={[latitude, longitude]} />
}
