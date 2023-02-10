import Joi from 'joi'

export const getVehicleValidation = Joi.object({
  location: Joi.string().required(),
  type: Joi.string().required()
})
export const getReserveValidation = Joi.object({
  vehicle: {
    id: Joi.number().required(),
    manufacturer: Joi.string().required(),
    model: Joi.string().required(),
    type: Joi.string().required(),
    year: Joi.number().required(),
    dailyPrice: Joi.number().required(),
    location: Joi.string().required(),
    image: Joi.string().required()
  },
  paymentInfo: {
    cardName: Joi.string().required(),
    cardNumber: Joi.string().required(),
    cvv: Joi.string().required(),
    expDate: Joi.string().required()
  },
  reservationInfo: {
    country: Joi.object(),
    endDate: Joi.date().required(),
    location: Joi.string().required(),
    name: Joi.string().required(),
    startDate: Joi.date().required(),
    type: Joi.string().required()
  }
})
