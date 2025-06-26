import { Router } from 'express'
import { fetchISSLocation } from '../services/issService'

const router = Router()

router.get('/iss-location', async (_req, res) => {
  try {
    const location = await fetchISSLocation()

    res.status(200).json(location)
  } catch (error) {
    console.error('Failed to broadcast ISS location:', error)
    res.status(500).json({ error: 'Broadcast failed' })
  }
})

export default router
