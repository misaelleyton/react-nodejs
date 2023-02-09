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
