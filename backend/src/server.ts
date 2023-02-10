import express, { type Request, type Response, type NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import ReservationRoute from './Routes/ReservationRoute'
import VehiclesRoute from './Routes/VehiclesRoute'
import morgan from 'morgan'
import { type ResponseError } from './types'

const app = express()
app.use(cors())
dotenv.config()

app.use(helmet())
app.use(bodyParser.json())
// morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>('dev'))

const serverPort = process.env.PORT ?? ''

// user route
app.use('/api/schedule', ReservationRoute)
app.use('/api/vehicles', VehiclesRoute)

// 404 response
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(404).send('Resource not found')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

app.use((error: ResponseError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status = error.status ?? 500
    const message =
      error.message ??
      'There was an error while processing your request, please try again'
    return res.status(status).send({
      status,
      message
    })
  } catch (error) {
    next(error)
  }
})
const port = serverPort ?? 3001
app.listen(port, () => {
  console.log(`Application started on ${port}...`)
})

export default app
