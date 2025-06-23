import WebSocket from 'ws'

import http from 'http'
import { WebSocketServer } from '../webSocketManager'

jest.mock('../../services/issService')

describe('WebSocketManager', () => {
  let server: http.Server

  beforeEach(() => {
    server = http.createServer()
  })

  afterEach(() => {
    WebSocketServer.stop()
  })

  it('should return the same instance (singleton)', () => {
    const instance1 = WebSocketServer
    const instance2 = WebSocketServer
    expect(instance1).toBe(instance2)
  })

  it('should warn and not setup if already initialized', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    WebSocketServer.setup(server)
    WebSocketServer.setup(server)
    expect(consoleSpy).toHaveBeenCalledWith('WebSocket server already initialized')
    consoleSpy.mockRestore()
  })

  it('should broadcast manually to all connected clients', () => {
    const mockClient = {
      readyState: WebSocket.OPEN,
      send: jest.fn(),
    }

    WebSocketServer['wss'] = {
      clients: new Set([mockClient]),
      close: jest.fn((cb) => cb?.()),
    } as any

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    WebSocketServer.sendToAllClients({ test: 'message' })
    expect(mockClient.send).toHaveBeenCalledWith(JSON.stringify({ test: 'message' }))
    expect(consoleSpy).toHaveBeenCalledWith('[WS] Manual broadcast to 1 clients')
    consoleSpy.mockRestore()
  })

  it('should warn if broadcasting when WebSocket server is not initialized', () => {
    WebSocketServer['wss'] = null
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
    WebSocketServer.sendToAllClients({ test: 'message' })
    expect(consoleSpy).toHaveBeenCalledWith('[WS] Tried to broadcast, but WebSocket server is not initialized')
    consoleSpy.mockRestore()
  })
})
