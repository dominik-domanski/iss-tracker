import axios from 'axios'
import { ISSLocation } from '../types/iss'

const API_URL = 'https://api.wheretheiss.at/v1/satellites/25544'

export const fetchISSLocation = async (): Promise<ISSLocation> => {
  const response = await axios.get(API_URL)

  const { altitude, latitude, longitude, velocity, timestamp } = response.data

  return {
    altitude,
    latitude,
    longitude,
    timestamp,
    velocity,
  }
}
