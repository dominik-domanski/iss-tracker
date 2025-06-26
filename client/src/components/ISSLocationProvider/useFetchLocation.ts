import { useState, useCallback } from 'react'
import type { ISSData } from '../App/types'

type UseFetchLocationResult = {
  position: ISSData | null
  error: string | null
  fetchLocation: () => Promise<void>
  loading: boolean
}

const API_URL = 'http://localhost:3000/api/iss-location'

export const useFetchLocation = (): UseFetchLocationResult => {
  const [position, setPosition] = useState<ISSData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchLocation = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const json: ISSData = await res.json()
      setPosition(json)
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { position, error, fetchLocation, loading }
}
