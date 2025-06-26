import { RefetchButton } from './ISSRefetchButton.styles'
import { useISSLocation } from '../ISSLocationProvider'

export const ISSRefetchButton = () => {
  const { refresh, loading } = useISSLocation()

  return (
    <RefetchButton className='refetch' onClick={refresh} disabled={false}>
      {loading ? 'Loading...' : 'GET POSITION'}
    </RefetchButton>
  )
}
