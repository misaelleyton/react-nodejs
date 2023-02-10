import memoize from 'lodash.memoize'
import axios from 'axios'
import type { FormType, ReservationForm, Vehicle } from '../assets/types'
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

const reservationInfo = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(VEHICLES_ENDPOINT + 'schedule/' + id)
    return (response.data as ReservationForm)
  } catch (error) {
    console.log(error)
  }
}

const postBookVehicle = async (query: ReservationForm): Promise<any> => {
  try {
    const response = await axios.post(VEHICLES_ENDPOINT + 'schedule', query)
    return (response.data as Array<Partial<ReservationForm>>)
  } catch (error) {
    console.log(error)
  }
}

const deleteReservation = async (id: string): Promise<any> => {
  try {
    const response = await axios.delete(VEHICLES_ENDPOINT + 'schedule/' + id)
    return (response.data as boolean)
  } catch (error) {
    console.log(error)
  }
}

const getSearchVehicle = memoize(searchVehicle)
const getReservationInfo = memoize(reservationInfo)
export {
  getSearchVehicle,
  postBookVehicle,
  getReservationInfo,
  deleteReservation
}
