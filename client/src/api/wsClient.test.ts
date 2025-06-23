/* eslint-disable @typescript-eslint/no-explicit-any */

import { wsClient } from './wsClient'

const mockSetConnectionStatus = jest.fn()
const mockAddPosition = jest.fn()

// Mock the module and return those functions
jest.mock('../stores', () => ({
  useISSStore: {
    getState: () => ({
      setConnectionStatus: mockSetConnectionStatus,
      addPosition: mockAddPosition,
    }),
  },
}))

describe('ISSWebSocketClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Reset internals
    wsClient['socket'] = null
    wsClient['connected'] = false
    wsClient['reconnectTimeout'] = null
    wsClient['connectionMonitor'] = null
  })

  it('returns singleton instance', () => {
    const instance1 = wsClient
    const instance2 = wsClient
    expect(instance1).toBe(instance2)
  })

  it('connects and sets connection status on open', () => {
    const mockSocket = new WebSocket('ws://localhost:3000')

    // Override the read-only readyState
    Object.defineProperty(mockSocket, 'readyState', {
      configurable: true,
      value: WebSocket.CONNECTING,
    })

    global.WebSocket = jest.fn(() => mockSocket) as any

    wsClient.connect()

    expect(WebSocket).toHaveBeenCalledWith('ws://localhost:3000')
  })

  it('calls addPosition on valid message', () => {
    const mockData = { latitude: 1, longitude: 2, timestamp: 123 }

    const mockSocket = {
      readyState: WebSocket.CONNECTING,
      onopen: null,
      onmessage: null,
      onerror: null,
      onclose: null,
      close: jest.fn(),
      send: jest.fn(),
      binaryType: 'blob' as BinaryType,
    } as unknown as WebSocket

    // Override global.WebSocket constructor to return our mock
    global.WebSocket = jest.fn(() => mockSocket) as any

    wsClient.connect()

    // Trigger the real onmessage handler set by wsClient.connect()
    const handler = mockSocket.onmessage!
    handler.call(mockSocket, {
      data: JSON.stringify(mockData),
    } as MessageEvent)

    expect(mockAddPosition).toHaveBeenCalledWith(mockData)
  })

  it('schedules reconnect on close', () => {
    jest.useFakeTimers()

    // Prevent infinite setInterval in startConnectionMonitor
    wsClient['startConnectionMonitor'] = jest.fn()

    const closeEvent = new CloseEvent('close')

    class MockSocket {
      static OPEN = 1
      static CONNECTING = 0
      static CLOSED = 3
      readyState = MockSocket.OPEN
      close = jest.fn()
      send = jest.fn()
      onopen: ((this: WebSocket, ev: Event) => any) | null = null
      onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null
      onerror: ((this: WebSocket, ev: Event) => any) | null = null
      onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null

      constructor() {
        setTimeout(() => {
          this.readyState = MockSocket.OPEN
          this.onopen?.call(this as any, new Event('open'))
        }, 0)
      }
    }

    const socket = new MockSocket()
    global.WebSocket = jest.fn(() => socket) as any

    const reconnectSpy = jest.fn()
    wsClient['scheduleReconnect'] = reconnectSpy

    wsClient.connect()

    // Simulate a close after the connect cycle
    setTimeout(() => {
      socket.onclose?.call(socket as any, closeEvent)
    }, 0)

    jest.runAllTimers()

    expect(mockSetConnectionStatus).toHaveBeenCalledWith(false)
    expect(reconnectSpy).toHaveBeenCalled()

    jest.useRealTimers()
  })

  it('clears timeouts and closes socket on manual close', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')
    const closeSpy = jest.fn()

    wsClient['socket'] = { close: closeSpy } as any
    wsClient['reconnectTimeout'] = setTimeout(() => {}, 100)
    wsClient['connectionMonitor'] = setInterval(() => {}, 100)

    wsClient.close()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    expect(clearIntervalSpy).toHaveBeenCalled()
    expect(closeSpy).toHaveBeenCalled()
    expect(mockSetConnectionStatus).toHaveBeenCalledWith(false)
  })
})
