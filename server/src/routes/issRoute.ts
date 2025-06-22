import { Router } from 'express'
import { fetchISSLocation } from '../services/issService'
import { WebSocketServer } from '../ws/webSocketManager'

const router = Router()

router.get('/refetch', async (_req, res) => {
  try {
    const location = await fetchISSLocation()
    WebSocketServer.sendToAllClients(location)
    res.status(200).json({ success: true, message: 'ISS position broadcasted.' })
  } catch (error) {
    console.error('Failed to broadcast ISS location:', error)
    res.status(500).json({ error: 'Broadcast failed' })
  }
})

export default router
