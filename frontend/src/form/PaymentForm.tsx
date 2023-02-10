import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import VehicleCard from './VehicleCard'
import type { ResultsParams, Vehicle } from '../assets/types'

const PaymentForm: React.FC<ResultsParams> = ({ searchResults, formData, selectVehicle, selectedVehicle, updateData }): JSX.Element => {
  const vehiclesCards = (searchResults: Vehicle[]): JSX.Element => {
    const elements = searchResults.map(vehicle => {
      return <Grid item xs={12} sm={6} key={vehicle?.id}>
        <VehicleCard vehicle={vehicle} formData={formData} selectVehicle={selectVehicle} selectedVehicle={selectedVehicle}/>
      </Grid>
    })
    return (<> {elements} </>)
  }
  return (
    <React.Fragment>
      { searchResults.length > 0
        ? <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <>
            { vehiclesCards(searchResults) }
          </>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              onChange={(event) => { updateData('cardName', event.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              onChange={(event) => { updateData('cardNumber', event.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              onChange={(event) => { updateData('expDate', event.target.value) }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              onChange={(event) => { updateData('cvv', event.target.value) }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
        : <Typography variant="h6" gutterBottom>
        There is no vehicles availables, please try again with different parameters
      </Typography>
      }
    </React.Fragment>
  )
}
export default PaymentForm
