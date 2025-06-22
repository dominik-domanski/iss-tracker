import { useISSStore } from '../../stores'

import { Polyline } from 'react-leaflet'

const PATH_OPTIONS = {
  color: 'hsla(40, 100%, 50%, 1)',
  weight: 3,
}

export const ISSPath = () => {
  const polylinePositions = useISSStore((state) => state.positions)

  return <Polyline positions={polylinePositions} pathOptions={PATH_OPTIONS} />
}
