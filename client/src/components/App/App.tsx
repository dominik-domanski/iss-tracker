import { Toaster } from 'react-hot-toast'
import './App.css'

import { LeafletMapContainer } from '../MapContainer'

import { IssLocationProvider } from '../ISSLocationProvider'
import { IssMarkerAdapter } from '../IssMarker'
import { ISSRefetchButton } from '../ISSRefetchButton'
import { ISSLastUpdated } from '../ISSLastUpdated'
import { ISSPath } from '../ISSPath'
import { ISSInfoPanel } from '../ISSInfoPanel'

export const App = () => (
  <>
    <Toaster />
    <LeafletMapContainer center={[0, 0]}>
      <IssLocationProvider>
        <IssMarkerAdapter />
        <ISSRefetchButton />
        <ISSLastUpdated />
        <ISSPath />
        <ISSInfoPanel />
      </IssLocationProvider>
    </LeafletMapContainer>
  </>
)
