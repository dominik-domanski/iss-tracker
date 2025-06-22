import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { RefetchButton } from './ISSRefetchButton.styles'

export const ISSRefetchButton = () => {
  const [loading, setLoading] = useState(false)

  const handleRefetch = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3000/api/refetch')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
    } catch (err) {
      console.error('Failed to refetch ISS location:', err)
      toast.error('Failed to trigger refetch on backend')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <RefetchButton className='refetch' onClick={handleRefetch} disabled={loading}>
      {loading ? 'Fetching...' : 'GET POSITION'}
    </RefetchButton>
  )
}
