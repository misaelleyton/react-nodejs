import type { Dayjs } from 'dayjs'
export interface Vehicle {
  id: number
  manufacturer: string
  model: string
  type: string
  year: number
  dailyPrice: number
  location: string
  image: string
}
export interface FormType {
  type: string | null
  location: string | null
}
export interface ResponseError {
  status: number
  message: string
}
export interface FormType {
    [key: string]: string | Record<string, unknown> | Dayjs | null
    type: string | null
    country: Record<string, unknown> | null
    location: string | null
    name: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
  }
  export interface PaymentType {
    [key: string]: string | null
    cardName: string | null
    cardNumber: string | null
    expDate: string | null
    cvv: string | null
  }
  export interface ReservationForm {
    [key: string]: FormType | null | Vehicle | PaymentType | undefined | number | boolean
    id: number
    deleted: boolean
    vehicle: Vehicle | undefined
    reservationInfo: FormType
    paymentInfo: PaymentType
  }