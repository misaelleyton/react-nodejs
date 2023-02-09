import type { Dayjs } from 'dayjs'

export interface IconsParams {
    iconColor: string
}
export interface CountryType {
    [key: string]: string | boolean | undefined
    code: string
    label: string
    phone: string
    suggested?: boolean
}
export interface FormType {
    [key: string]: string | CountryType | Dayjs | null
    type: string | null
    country: CountryType | null
    location: string | null
    name: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
}
export interface Vehicle {
    [key: string]: string | number | boolean | undefined
    id: number
    manufacturer: string
    model: string
    type: string
    year: number
    dailyPrice: number
    location: string
    image: string
}
export interface VehicleParams {
    vehicle: Vehicle
    formData: FormType
    selectVehicle: Function
    selectedVehicle: Vehicle | undefined
}
export interface SearchFormParams {
    updateData: Function
    formData: FormType
}
export interface ResultsParams {
    searchResults: Vehicle[] | []
    formData: FormType
    selectVehicle: Function
    selectedVehicle: Vehicle | undefined
}