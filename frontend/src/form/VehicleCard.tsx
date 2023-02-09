import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import type { VehicleParams } from '../assets/types'
import dayjs from 'dayjs'

const VehicleCard: React.FC<VehicleParams> = ({ vehicle, formData, selectVehicle, selectedVehicle }): JSX.Element => {
  console.log('vehicle')
  console.log(vehicle)
  console.log('selectedVehicle')
  console.log(selectedVehicle)
  const startDate = dayjs(formData.startDate)
  const endDate = dayjs(formData.endDate)
  // we only charge one more day in case the return time is more than 12 hours from start time
  const daysDiff = Math.round(endDate.diff(startDate, 'day', true) ?? 1)
  return (
    <Card sx={{ maxWidth: 250 }} variant='outlined' style={{ backgroundColor: '#f5f5f5' }} className={vehicle.id === selectedVehicle?.id ? 'selected' : 'notSelected'} id={`${vehicle.id}`}>
      <CardActionArea
        id={`${vehicle.id}`}
        onClick={(event) => { selectVehicle(vehicle) }}
      >
        <CardMedia
          id={`${vehicle.id}`}
          style={{ backgroundColor: 'white' }}
          component='img'
          height='140'
          image={vehicle.image}
          alt={vehicle.manufacturer + ' ' + vehicle.model}
        />
        <CardContent id={`${vehicle.id}`}>
          <Typography gutterBottom variant='h5' component='div'>
            { `${vehicle.manufacturer}` }
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            { `${vehicle.manufacturer} ${vehicle.model} ${vehicle.year}`}
            <br />
            { `Located in ${vehicle.location}`}
            <br />
            { `Daily Price $${vehicle.dailyPrice}`}
            <br />
            <Typography gutterBottom variant='h6' component='div'>
              { `Total Price $${daysDiff * vehicle.dailyPrice}`}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default VehicleCard
