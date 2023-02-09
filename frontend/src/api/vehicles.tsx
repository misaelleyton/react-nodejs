import memoize from 'lodash.memoize'
import axios from 'axios'
import type { FormType, Vehicle } from '../assets/types'
const VEHICLES_ENDPOINT =
  'http://localhost:3001/api/'

const searchVehicle = async (query: Partial<FormType>): Promise<any> => {
  try {
    const params = Object.entries(query) as string[][]
    const response = await axios.get(VEHICLES_ENDPOINT + 'vehicles?' + new URLSearchParams(params).toString())
    return (response.data as Vehicle[])
  } catch (error) {
    console.log(error)
  }
}
export default memoize(searchVehicle)
