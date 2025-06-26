import axios from 'axios'
import { ISSLocation } from '../types/iss'

const API_URL = 'https://api.wheretheiss.at/v1/satellites/25544'

export const fetchISSLocation = async (): Promise<ISSLocation> => {
  try {
    const response = await axios.get(API_URL)
    const { altitude, latitude, longitude, velocity, timestamp } = response.data

    return {
      altitude,
      latitude,
      longitude,
      velocity,
      timestamp,
    }
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      const reason = err.response?.statusText || err.message
      console.error(`Axios error fetching ISS data: ${status} ${reason}`)
      throw new Error(`Failed to fetch ISS data: ${reason}`)
    } else {
      console.error('Unknown error fetching ISS data:', err)
      throw new Error('Unexpected error while fetching ISS data')
    }
  }
}
