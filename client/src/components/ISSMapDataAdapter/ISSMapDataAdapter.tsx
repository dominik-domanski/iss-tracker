import { useMap } from 'react-leaflet'
import { useISSStore } from '../../stores'

import { useNightShadowLayer, useISSConnection, useISSMapControl } from './hooks'
import { IssMarkerAdapter } from '../IssMarker'
import { ISSPath } from '../ISSPath'
import { ISSLastUpdated } from '../ISSLastUpdated'
import { ISSInfoPanel } from '../ISSInfoPanel'

export const ISSMapDataAdapter = () => {
  const map = useMap()

  const latestPosition = useISSStore((state) => state.latestPosition)

  useISSConnection()
  useNightShadowLayer(map)
  useISSMapControl(map, latestPosition)

  return (
    <>
      <IssMarkerAdapter />
      <ISSPath />
      <ISSLastUpdated />
      <ISSInfoPanel />
    </>
  )
}
