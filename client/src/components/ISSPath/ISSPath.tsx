import { Polyline } from 'react-leaflet'

import { useISSLocation } from '../ISSLocationProvider'

const PATH_OPTIONS = {
  color: 'hsla(40, 100%, 50%, 1)',
  weight: 3,
}

export const ISSPath = () => {
  const { positions } = useISSLocation()

  return <Polyline positions={positions} pathOptions={PATH_OPTIONS} />
}
