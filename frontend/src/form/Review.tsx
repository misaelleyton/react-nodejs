import * as React from 'react'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import Grid from '@mui/material/Grid'
import VehicleCard from './VehicleCard'
import type { ReviewReservationParams } from '../assets/types'

const Review: React.FC<ReviewReservationParams> = ({ vehicle, reservationInfo, paymentInfo, id }): JSX.Element => {
  return (
    <React.Fragment>
      { vehicle !== undefined
        ? <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Reservation Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={0} sm={3}>
          </Grid>
          <Grid item xs={12} sm={6} key={vehicle?.id}>
            <VehicleCard vehicle={vehicle} formData={reservationInfo} selectedVehicle={vehicle}/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Name
            </Typography>
            <Typography gutterBottom>{ reservationInfo?.name }</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Start Date
            </Typography>
            <Typography gutterBottom>{ dayjs(reservationInfo?.startDate).format('MM-DD-YYYY HH:mm') }</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              End Date
            </Typography>
            <Typography gutterBottom>{ dayjs(reservationInfo?.endDate).format('MM-DD-YYYY HH:mm') }</Typography>
          </Grid>
        </Grid>
      </React.Fragment>
        : <Typography variant="h6" gutterBottom>
        Reserve not found
      </Typography>
      }
    </React.Fragment>
  )
}
export default Review
