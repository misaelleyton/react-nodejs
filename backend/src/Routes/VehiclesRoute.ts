import { Router } from 'express'
import * as VehiclesController from '../Controllers/VehiclesController'
const router: Router = Router()

// //create Schedule
// router.post("/", VehiclesController.createSchedule);

// get Schedule
router.get('/', VehiclesController.getVehicles)

// //get Schedule By user State
// router.get("/:userId", VehiclesController.getScheduleByState);

// //update Schedule
// router.patch("/", VehiclesController.updateSchedule);

// //delete post
// router.delete("/:scheduleId", VehiclesController.deteleSchedule);

export default router
