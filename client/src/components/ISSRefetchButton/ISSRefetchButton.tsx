import { RefetchButton } from './ISSRefetchButton.styles'
import { useISSLocation } from '../ISSLocationProvider/ISLocationProvider'

export const ISSRefetchButton = () => {
  const { refreshPosition } = useISSLocation()

  return (
    <RefetchButton className='refetch' onClick={refreshPosition} disabled={false}>
      'GET POSITION'
    </RefetchButton>
  )
}
