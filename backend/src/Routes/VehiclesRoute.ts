import { Router } from 'express'
import * as VehiclesController from '../Controllers/VehiclesController'
const router: Router = Router()

// get vehicles
router.get('/', VehiclesController.getVehicles)

export default router
