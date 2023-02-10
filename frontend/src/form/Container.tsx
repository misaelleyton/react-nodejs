import * as React from 'react'
import MuiAlert from '@mui/material/Alert'
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import PaymentForm from './PaymentForm'
import Review from './Review'
import SearchForm from './SearchForm'
import { vehicles } from '../api'
import type { AlertProps } from '@mui/material/Alert'
import type {
  FormType,
  CountryType,
  Vehicle,
  PaymentType,
  ReservationForm,
  ReviewReservationParams
} from '../assets/types'
import type { Dayjs } from 'dayjs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const steps = ['Request Information', 'Payment details', 'Review your order']

const theme = createTheme()

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [searchResults, setSearchResults] = React.useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle>()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */ // only for time reasons
  const [formData, setFormData] = React.useState<FormType>({
    type: null,
    country: null,
    location: null,
    name: null,
    startDate: null,
    endDate: null
  })
  const [paymentData, setPaymentData] = React.useState<PaymentType>({
    cardName: null,
    cardNumber: null,
    expDate: null,
    cvv: null
  })
  const [reviewReservation, setReviewReservation] = React.useState<ReviewReservationParams>()

  const updateData = (field: string, newValue: string | CountryType | Dayjs | null): void => {
    const newData = { ...formData, [field]: newValue }
    if (field === 'country') {
      newData.location = (newValue as CountryType).label
    }
    setFormData(formData => newData)
  }
  const updatePaymentData = (field: string, newValue: string | null): void => {
    const newData = { ...paymentData, [field]: newValue }
    setPaymentData(paymentData => newData)
  }
  const selectVehicle = (vehicle: Vehicle): void => {
    setSelectedVehicle(vehicle)
  }
  function getStepContent (step: number): JSX.Element {
    switch (step) {
      case 0:
        return <SearchForm updateData={updateData} formData={formData}/>
      case 1:
        return <PaymentForm searchResults={searchResults} formData={formData} updateData={updatePaymentData} selectVehicle={selectVehicle} selectedVehicle={selectedVehicle}/>
      case 2:
        return <Review {...reviewReservation}/>
      default:
        throw new Error('Unknown step')
    }
  }

  React.useEffect(() => {
    if (location.pathname.includes('/reservationDetail')) {
      setActiveStep(2)
      getReservationInfo(id).catch(console.error)
    } else {
      setActiveStep(0)
    }
  }, [location])

  const getReservationInfo = async (id?: string): Promise<any> => {
    const data = await vehicles.getReservationInfo(id ?? '')
    setReviewReservation(data as ReviewReservationParams)
  }
  const handleNext = (): void => {
    const process = async (): Promise<any> => {
      switch (activeStep) {
        case 0: {
          const validate = Object.values(formData).some(val => val === null || val === undefined || val === '')
          if (!validate) {
            const { type, location } = { ...formData }
            const data = await vehicles.getSearchVehicle({ type, location })
            setSearchResults(data as Vehicle[])
            setActiveStep(activeStep + 1)
          } else {
            setError('All fields marked with an asterisk * are required. ')
          }
          break
        }
        case 1: {
          const validate = Object.values(paymentData).some(val => val === null || val === undefined || val === '')
          if (!validate && selectVehicle.length > 0) {
            const reserveData: ReservationForm = { vehicle: selectedVehicle, paymentInfo: paymentData, reservationInfo: formData }
            const data = await vehicles.postBookVehicle(reserveData) as ReviewReservationParams
            navigate(`/reservationDetail/${(data.id ?? '')}`)
          } else {
            if (selectVehicle.length > 0) {
              setError('All fields marked with an asterisk * are required. ')
            } else {
              setError('You must select a vehicle to continue.')
            }
          }
          break
        }
        case 2: {
          const data: boolean = await vehicles.deleteReservation(id ?? '')
          if (data) {
            setSuccess('Reservation deleted successfully')
            navigate('/')
          } else {
            setError('Error deleting reservation, please try again later')
          }
          break
        }
      }
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
            Double Nine Rent a Car
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
                {activeStep === 1 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Cancel Reservation' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
              )}
            <Snackbar
              open={error !== ''}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => { setError('') }}
            >
              <Alert severity="error">{ error }</Alert>
            </Snackbar>
            <Snackbar
              open={success !== ''}
              autoHideDuration={3000}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => { setSuccess('') }}
            >
              <Alert severity="success">{ success }</Alert>
            </Snackbar>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default Checkout
