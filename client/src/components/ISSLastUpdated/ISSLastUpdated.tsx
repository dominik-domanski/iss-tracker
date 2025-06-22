import { useMemo } from 'react'
import { Wrapper } from './ISSLastUpdated.styles'
import { useISSStore } from '../../stores'

export const ISSLastUpdated = () => {
  const latestPosition = useISSStore((state) => state.latestPosition)

  const formattedTime = useMemo(() => {
    if (!latestPosition?.timestamp) return 'N/A'

    const date = new Date(latestPosition.timestamp * 1000)
    return date.toLocaleTimeString()
  }, [latestPosition])

  return (
    <Wrapper>
      <strong>Last Updated:</strong> {formattedTime}
    </Wrapper>
  )
}
