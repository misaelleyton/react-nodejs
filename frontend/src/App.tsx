import React from 'react'
import './App.css'
import Checkout from './form/Container'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/reservationDetail/:id" element={<Checkout />} />
        </Routes>
      </Router>
      </LocalizationProvider>
    </div>
  )
}

export default App
