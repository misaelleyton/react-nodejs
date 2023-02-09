import React from 'react'
import './App.css'
import Checkout from './form/Container'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const App: React.FC = () => {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Checkout />
      </LocalizationProvider>
    </div>
  )
}

export default App
