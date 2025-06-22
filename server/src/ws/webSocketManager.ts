import WebSocket from 'ws'
import { Server } from 'http'
import { fetchISSLocation } from '../services/issService'

const UPDATE_TIME_SEC = 5
const HEARTBEAT_INTERVAL = 30000

class WebSocketManager {
  private static instance: WebSocketManager
  private wss: WebSocket.Server | null = null
  private broadcastInterval: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

  public setup(server: Server) {
    if (this.wss) {
      console.warn('WebSocket server already initialized')
      return
    }

    this.wss = new WebSocket.Server({ server })

    this.wss.on('connection', (socket: WebSocket & { isAlive?: boolean }) => {
      console.log('WebSocket client connected')
      socket.isAlive = true

      socket.on('pong', () => {
        socket.isAlive = true
      })

      fetchISSLocation().then((data) => {
        if (socket.readyState === WebSocket.OPEN) {
          console.log('Sending initial position')
          socket.send(JSON.stringify(data))
        }
      })

      socket.on('close', () => {
        console.log('WebSocket client disconnected')
      })

      socket.on('error', (err) => {
        console.error('WebSocket error on client socket:', err)
      })
    })

    this.startBroadcasting()
    this.startHeartbeat()
  }

  private startBroadcasting() {
    this.broadcastInterval = setInterval(async () => {
      try {
        const data = await fetchISSLocation()
        const payload = JSON.stringify(data)

        let openCount = 0
        this.wss?.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(payload)
            openCount++
          }
        })

        console.log(`Broadcasted to ${openCount} clients`)
      } catch (err) {
        console.error('WebSocket broadcast error:', err)
      }
    }, UPDATE_TIME_SEC * 1000)
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.wss?.clients.forEach((socket: WebSocket & { isAlive?: boolean }) => {
        if (!socket.isAlive) {
          console.log('Terminating stale connection')
          return socket.terminate()
        }

        socket.isAlive = false
        socket.ping()
      })
    }, HEARTBEAT_INTERVAL)
  }

  public sendToAllClients(data: any) {
    if (!this.wss) {
      console.warn('[WS] Tried to broadcast, but WebSocket server is not initialized')
      return
    }

    const payload = JSON.stringify(data)
    let count = 0

    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload)
        count++
      }
    })

    console.log(`[WS] Manual broadcast to ${count} clients`)
  }

  public stop() {
    this.broadcastInterval && clearInterval(this.broadcastInterval)
    this.heartbeatInterval && clearInterval(this.heartbeatInterval)
    this.wss?.close(() => {
      console.log('WebSocket server closed')
    })
    this.wss = null
  }
}

export const WebSocketServer = WebSocketManager.getInstance()
