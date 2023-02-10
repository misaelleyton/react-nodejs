import createError from 'http-errors'
import { Request, Response, NextFunction } from 'express'
import { getReserveValidation } from '../Validations/VehicleValidation'
import { 
  getMaxReserveId,
  createReservation,
  getReservationFromFile,
  deleteReservationInDB
} from '../utils/dbHandler'
import type { ReservationForm } from '../types'
/**
 * Create new reservation
 * @param req
 * @param res
 * @param next
 */
export const bookVehicle = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const process = async (): Promise<any> => {
      try {
        const validatedFields = (await getReserveValidation.validateAsync(req.body)) as Partial<ReservationForm>
        const reserveId = getMaxReserveId()
        validatedFields.id = reserveId
        validatedFields.deleted = false
        console.log('fields')
        console.log(validatedFields)
        const reserve = createReservation(validatedFields as ReservationForm)
        if (reserve) {
          res.status(200).json(
            validatedFields
          )
        }
      } catch (error) {
        console.log(error)
        next(
          new createError.BadRequest(
            'Operation failed, invalid details provided.'
          )
        )
      }
    }
    process().catch((e) => { console.log(e) })
  }
  
  /**
   * Get reservation info
   * @param req
   * @param res
   * @param next
   */
  export const getReservation = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const process = async (): Promise<any> => {
      try {
        const reservation: ReservationForm | undefined = getReservationFromFile(parseInt(req.params.reservationId))
        res.status(200).json(
          reservation
        )
      } catch (error) {
        console.log(error)
        next(
          new createError.BadRequest(
            'Operation failed, invalid details provided.'
          )
        )
      }
    }
    process().catch((e) => { console.log(e) })
  }
  
  /**
   * Get reservation info
   * @param req
   * @param res
   * @param next
   */
  export const deleteReservation = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const process = async (): Promise<any> => {
      try {
        const deleted: boolean = deleteReservationInDB(parseInt(req.params.reservationId))
        res.status(200).json(
          deleted
        )
      } catch (error) {
        console.log(error)
        next(
          new createError.BadRequest(
            'Operation failed, invalid details provided.'
          )
        )
      }
    }
    process().catch((e) => { console.log(e) })
  }
  