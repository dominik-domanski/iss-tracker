import { useISSLocation } from '../ISSLocationProvider'
import { Panel, InfoRow } from './ISSInfoPanel.styles'

export const ISSInfoPanel = () => {
  const { position } = useISSLocation()

  if (!position) {
    return <Panel>Waiting for ISS data...</Panel>
  }

  const { latitude, longitude, velocity } = position
  const orbitalPeriodMinutes = 92.68 // average period for ISS, static

  return (
    <Panel>
      <h3>ISS Current Info</h3>
      <InfoRow>
        <span>Latitude: </span>
        <span>{latitude.toFixed(4)}°</span>
      </InfoRow>
      <InfoRow>
        <span>Longitude: </span>
        <span>{longitude.toFixed(4)}°</span>
      </InfoRow>
      <InfoRow>
        <span>Velocity:</span>
        <span>{velocity.toFixed(2)} km/h</span>
      </InfoRow>
      <InfoRow>
        <span>Orbital Period: </span>
        <span>{orbitalPeriodMinutes} min</span>
      </InfoRow>
    </Panel>
  )
}
