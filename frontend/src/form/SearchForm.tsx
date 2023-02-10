import React from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import SedanIcon from '../assets/sedan'
import PickupIcon from '../assets/pickup-truck'
import SportsCarIcon from '../assets/sports-car'
import MotorCycleIcon from '../assets/motorcycle'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import { countries } from '../assets/countries'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import type { SearchFormParams, CountryType } from '../assets/types'

const SearchForm: React.FC<SearchFormParams> = ({ updateData, formData }): JSX.Element => {
  return (
    <React.Fragment>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} >
          <FormLabel id="car-type-select">Select vehicle type *</FormLabel>
          <RadioGroup
            row
            aria-labelledby='car-type-select'
            onChange={(event) => { updateData('type', event.target.value) }}
            name='row-radio-buttons-group'
          >
            <FormControlLabel value='sedan' control={<Radio value="sedan" required={true} icon={<SedanIcon iconColor='black'/>} checkedIcon={<SedanIcon iconColor='red'/>}/>} label='Sedan' />
            <FormControlLabel value='pickup' control={<Radio value="pickup" required={true} icon={<PickupIcon iconColor='black' />} checkedIcon={<PickupIcon iconColor='red'/>}/>} label='Pickup Truck' />
            <FormControlLabel value='sports' control={<Radio value="sports" required={true} icon={<SportsCarIcon iconColor='black' />} checkedIcon={<SportsCarIcon iconColor='red'/>}/>} label='Sports Car' />
            <FormControlLabel value='motorcycle' control={<Radio value="motorcycle" required={true} icon={<MotorCycleIcon iconColor='black' />} checkedIcon={<MotorCycleIcon iconColor='red'/>}/>} label='Motorcycle' />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            id="country-select"
            options={countries}
            autoHighlight
            getOptionLabel={(option: CountryType) => option.label ?? ''}
            value={formData.country}
            onChange={(event: any, newValue: CountryType | null) => {
              /* eslint-disable @typescript-eslint/no-unsafe-call */ // only for time reasons
              updateData('country', newValue)
            }}
            renderOption={(props, option: CountryType) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code})
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a pickup location"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='name'
            data-testid='name'
            name='name'
            label='Full Name'
            fullWidth
            variant='outlined'
            onChange={(event) => { updateData('name', event.target.value) }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label="Pickup Date and Time"
            value={formData.startDate}
            onChange={(event) => { updateData('startDate', event) }}
            renderInput={(params) => <TextField {...params} required/>}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            label="Dropoff Date and Time"
            value={formData.endDate}
            onChange={(event) => { updateData('endDate', event) }}
            renderInput={(params) => <TextField {...params} required/>}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default SearchForm
