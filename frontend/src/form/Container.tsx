import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import SearchForm from './SearchForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import type { FormType, CountryType, Vehicle } from '../assets/types'
import type { Dayjs } from 'dayjs'
import { vehicles } from '../api'
const steps = ['Request Information', 'Payment details', 'Review your order']

const theme = createTheme()

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [searchResults, setSearchResults] = React.useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle>()
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */ // only for time reasons
  const [formData, setFormData] = React.useState<FormType>({
    type: null,
    country: null,
    location: null,
    name: null,
    startDate: null,
    endDate: null
  })

  const updateData = (field: string, newValue: string | CountryType | Dayjs | null): void => {
    const newData = { ...formData, [field]: newValue }
    if (field === 'country') {
      newData.location = (newValue as CountryType).label
    }
    setFormData(formData => newData)
  }

  const selectVehicle = (vehicle: Vehicle): void => {
    console.log(vehicle)
    setSelectedVehicle(vehicle)
  }
  function getStepContent (step: number): JSX.Element {
    switch (step) {
      case 0:
        return <SearchForm updateData={updateData} formData={formData}/>
      case 1:
        return <PaymentForm searchResults={searchResults} formData={formData} selectVehicle={selectVehicle} selectedVehicle={selectedVehicle}/>
      case 2:
        return <Review />
      default:
        throw new Error('Unknown step')
    }
  }
  const handleNext = (): void => {
    const process = async (): Promise<any> => {
      switch (activeStep) {
        case 0: {
          const { type, location } = { ...formData }
          const data = await vehicles.default({ type, location })
          setSearchResults(data as Vehicle[])
          break
        }
        case 1: {
          break
        }
        case 2: {
          break
        }
      }
      setActiveStep(activeStep + 1)
    }
    process().catch((e) => { console.log(e) })
  }

  const handleBack = (): void => {
    setActiveStep(activeStep - 1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Vehicle Reservations
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 6 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Vehicle Reservations
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length
            ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
              )
            : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
              )}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default Checkout
