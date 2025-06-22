import { Toaster } from 'react-hot-toast'
import './App.css'

import { LeafletMapContainer } from '../MapContainer'

import { ISSRefetchButton } from '../ISSRefetchButton'
import { ISSMapDataAdapter } from '../ISSMapDataAdapter'

export const App = () => (
  <>
    <Toaster />
    <LeafletMapContainer center={[0, 0]}>
      <ISSMapDataAdapter />
      <ISSRefetchButton />
    </LeafletMapContainer>
  </>
)
