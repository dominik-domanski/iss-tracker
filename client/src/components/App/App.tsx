import { Toaster } from 'react-hot-toast'
import './App.css'

import { LeafletMapContainer } from '../MapContainer'

import { ISSProvider } from '../ISSLocationProvider/ISLocationProvider'
import { IssMarkerAdapter } from '../IssMarker'
import { ISSRefetchButton } from '../ISSRefetchButton'
import { ISSLastUpdated } from '../ISSLastUpdated'

export const App = () => (
  <>
    <Toaster />
    <LeafletMapContainer center={[0, 0]}>
      <ISSProvider>
        <IssMarkerAdapter />
        <ISSRefetchButton />
        <ISSLastUpdated />
      </ISSProvider>
      {/* <ISSMapDataAdapter />
      <ISSRefetchButton /> */}
    </LeafletMapContainer>
  </>
)
