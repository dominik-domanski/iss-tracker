import { useEffect } from 'react'
import { wsClient } from '../../../api/wsClient'

export const useISSConnection = () => {
  useEffect(() => {
    wsClient.connect()

    return () => {
      wsClient.close()
    }
  }, [])
}
