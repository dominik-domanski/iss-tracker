import { useISSLocation } from '../ISSLocationProvider/ISLocationProvider'
import { IssMarker } from './IssMarker'

export const IssMarkerAdapter = () => {
  const { position } = useISSLocation()

  if (!position) {
    return null
  }

  const { latitude, longitude } = position

  return <IssMarker isConnected={true} heading={0} position={[latitude, longitude]} />
}
