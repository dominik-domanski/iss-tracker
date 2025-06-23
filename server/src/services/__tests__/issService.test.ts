import axios from 'axios'
import { fetchISSLocation } from '../../services/issService'
import type { ISSLocation } from '../../types/iss'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('fetchISSLocation', () => {
  it('should fetch and return ISS location data correctly', async () => {
    const mockData: ISSLocation = {
      altitude: 408,
      latitude: 45.0,
      longitude: 90.0,
      timestamp: 1723456789,
      velocity: 7700,
    }

    mockedAxios.get.mockResolvedValueOnce({ data: mockData })

    const result = await fetchISSLocation()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.wheretheiss.at/v1/satellites/25544')
    expect(result).toEqual(mockData)
  })

  it('should throw an error if axios fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchISSLocation()).rejects.toThrow('Network Error')
  })
})
