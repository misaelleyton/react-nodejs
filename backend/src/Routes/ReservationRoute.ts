import { Router } from 'express'
import * as ReservationController from '../Controllers/ReservationController'
const router: Router = Router()

// create reservation
router.post("/", ReservationController.bookVehicle);

//get reservation
router.get("/:reservationId", ReservationController.getReservation);

// delete reservation
router.delete("/:reservationId", ReservationController.deleteReservation);

export default router
