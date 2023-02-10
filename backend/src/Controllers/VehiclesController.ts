import { type Request, type Response, type NextFunction } from 'express'
import createError from 'http-errors'
import { getVehicleValidation } from '../Validations/VehicleValidation'
import { getVehiclesFromFile } from '../utils/dbHandler'
import type { Vehicle } from '../types'

/**
 * Get vehicles
 * @param req
 * @param res
 * @param next
 */
export const getVehicles = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const process = async (): Promise<any> => {
    try {
      const validatedFields = (await getVehicleValidation.validateAsync(req.query)) as Partial<Vehicle>
      const vehicles: Vehicle[] = getVehiclesFromFile(validatedFields)
      res.status(200).json(
        vehicles
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

