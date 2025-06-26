import { useMemo } from 'react'
import { Wrapper } from './ISSLastUpdated.styles'
import { useISSLocation } from '../ISSLocationProvider/ISLocationProvider'

export const ISSLastUpdated = () => {
  const { position } = useISSLocation()

  const formattedTime = useMemo(() => {
    if (!position?.timestamp) return 'N/A'

    const date = new Date(position.timestamp * 1000)
    return date.toLocaleTimeString()
  }, [position])

  return (
    <Wrapper>
      <strong>Last Updated:</strong> {formattedTime}
    </Wrapper>
  )
}
