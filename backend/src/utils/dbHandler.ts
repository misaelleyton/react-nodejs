import * as fs from 'fs'
import type { ReservationForm, Vehicle } from '../types'
import path from 'path'
const dataPath = path.join(__dirname, '/../../db/db.json') // path to our JSON file

const getVehiclesFromFile = (data: Partial<Vehicle>): Vehicle[] => {
  const jsonData = fs.readFileSync(dataPath)
  const db = JSON.parse(jsonData.toString()) as Record<string, Vehicle[] | ReservationForm[]>
  console.log(db)
  console.log('veh')
  console.log(db.vehicles)
  const filterResults: Vehicle[] = (db.vehicles as Vehicle[]).filter((vehicle: Vehicle) => {
    return vehicle.type === data.type && data.location === vehicle.location
  })
  return filterResults
}

const getReservationsFromFile = (): ReservationForm[] => {
  const jsonData = fs.readFileSync(dataPath)
  const db = JSON.parse(jsonData.toString()) as Record<string, Vehicle[] | ReservationForm[]>
  const filterResults: ReservationForm[] = (db.reservations as ReservationForm[]).filter((reservation: ReservationForm) => {
    return !reservation.deleted
  })
  return filterResults as ReservationForm[]
}

const getReservationFromFile = (id: number): ReservationForm | undefined => {
  const jsonData = fs.readFileSync(dataPath)
  const db = JSON.parse(jsonData.toString()) as Record<string, Vehicle[] | ReservationForm[]>
  const filterResults: ReservationForm | undefined = (db.reservations as ReservationForm[]).find((reservation: ReservationForm) => {
    return reservation.id === id && reservation.deleted !== true
  })
  return filterResults
}

const getDbFromFile = (): Record<string, Vehicle[] | ReservationForm[]> => {
  const jsonData = fs.readFileSync(dataPath)
  const db = JSON.parse(jsonData.toString()) as Record<string, Vehicle[] | ReservationForm[]>
  return db
}

const deleteReservationInDB = (id: number): boolean => {
  const previous_data = getDbFromFile();
  const reserves = previous_data.reservations as ReservationForm[]
  const updatedReserves = reserves.map(reserve => {
    if (reserve.id === id) {
      return { ...reserve, deleted: true }
    } else {
      return reserve
    }
  })
  previous_data.reservations = updatedReserves
  const stringifyData = JSON.stringify(previous_data);
  try {
    fs.writeFileSync(dataPath, stringifyData)
    return true
  } catch(error) {
    return false
  }
}

const getMaxReserveId = (): number => {
  const reservations = getReservationsFromFile()
  const max_id =  Math.max(...reservations.map((o: ReservationForm) => o.id));
  return max_id + 1
}

const createReservation = (reservation: ReservationForm): boolean => {
  const previous_data = getDbFromFile();
  (previous_data.reservations as ReservationForm[]).push(reservation);
  const stringifyData = JSON.stringify(previous_data);
  try {
    fs.writeFileSync(dataPath, stringifyData)
    return true
  } catch(error) {
    return false
  }
}

export { 
  getVehiclesFromFile, 
  getMaxReserveId, 
  getReservationsFromFile,
  createReservation,
  getReservationFromFile,
  deleteReservationInDB
}
