import request from 'supertest'
import express from 'express'
import { WebSocketServer } from '../../ws/webSocketManager'
import issRoute from '../issRoute'

jest.mock('../../services/issService', () => ({
  fetchISSLocation: jest.fn().mockResolvedValue({
    latitude: 1,
    longitude: 2,
    timestamp: 1234567890,
  }),
}))

describe('GET /api/refetch', () => {
  const app = express()
  app.use('/api', issRoute)

  beforeAll(() => {
    WebSocketServer.sendToAllClients = jest.fn()
  })

  it('should respond with success message', async () => {
    const response = await request(app).get('/api/refetch')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ success: true, message: 'ISS position broadcasted.' })
    expect(WebSocketServer.sendToAllClients).toHaveBeenCalled()
  })
})
