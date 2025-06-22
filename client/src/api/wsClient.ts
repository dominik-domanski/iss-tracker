import type { ISSData } from '../components/App/types'
import { useISSStore } from '../stores'

const WS_URL = 'ws://localhost:3000'

class ISSWebSocketClient {
  private static instance: ISSWebSocketClient
  private socket: WebSocket | null = null
  private connected = false
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  private connectionMonitor: ReturnType<typeof setInterval> | null = null

  private constructor() {}

  public static getInstance(): ISSWebSocketClient {
    if (!ISSWebSocketClient.instance) {
      ISSWebSocketClient.instance = new ISSWebSocketClient()
    }
    return ISSWebSocketClient.instance
  }

  public get isConnected() {
    return this.connected
  }

  private setConnectionStatus(status: boolean) {
    this.connected = status
    useISSStore.getState().setConnectionStatus(status)
  }

  public connect() {
    this.startConnectionMonitor()

    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      console.info('[WS] Reusing existing socket')
      return
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    try {
      this.socket = new WebSocket(WS_URL)

      this.socket.onopen = () => {
        console.info('[WS] Connected')
        this.setConnectionStatus(true)
      }

      this.socket.onmessage = (event) => {
        try {
          const data: ISSData = JSON.parse(event.data)
          useISSStore.getState().addPosition(data)
        } catch (err) {
          console.error('[WS] Invalid JSON message:', err)
        }
      }

      this.socket.onerror = (err) => {
        console.error('[WS] Error:', err)
      }

      this.socket.onclose = () => {
        console.warn('[WS] Disconnected')
        this.setConnectionStatus(false)
        this.scheduleReconnect()
      }
    } catch (err) {
      console.error('[WS] Connection attempt failed:', err)
      this.scheduleReconnect()
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) return // Already scheduled
    console.info('[WS] Attempting to reconnect in 5s...')
    this.reconnectTimeout = setTimeout(() => {
      this.connect()
    }, 5000)
  }

  private startConnectionMonitor() {
    if (this.connectionMonitor) return
    this.connectionMonitor = setInterval(() => {
      if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
        console.warn('[WS] Socket closed — forcing reconnect')
        this.connect()
      }
    }, 5000)
  }

  public close() {
    console.log('[WS] Manually closing socket')

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.connectionMonitor) {
      clearInterval(this.connectionMonitor)
      this.connectionMonitor = null
    }

    this.socket?.close()
    this.socket = null
    this.connected = false
    useISSStore.getState().setConnectionStatus(false)
  }
}

export const wsClient = ISSWebSocketClient.getInstance()
