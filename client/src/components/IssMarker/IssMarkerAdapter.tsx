import { useISSStore } from '../../stores'

import { IssMarker } from './IssMarker'

export const IssMarkerAdapter = () => {
  const latestPosition = useISSStore((state) => state.latestPosition)
  const isConnected = useISSStore((state) => state.isConnected)

  if (!latestPosition) {
    return null
  }

  const { heading, latitude, longitude } = latestPosition

  return <IssMarker isConnected={isConnected} heading={heading} position={[latitude, longitude]} />
}
