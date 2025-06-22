import { MapContainer, TileLayer } from 'react-leaflet'
import { type LatLngExpression } from 'leaflet'

export const LeafletMapContainer = ({ center, children }: { center: LatLngExpression; children: React.ReactNode }) => (
  <MapContainer
    center={center}
    zoom={3}
    zoomControl={false}
    zoomSnap={0.25}
    zoomDelta={0.25}
    style={{ height: '100vh', width: '100%' }}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    />
    {children}
  </MapContainer>
)
