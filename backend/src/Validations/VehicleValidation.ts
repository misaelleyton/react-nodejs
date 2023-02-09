import Joi from 'joi'

export const getVehicleValidation = Joi.object({
  location: Joi.string().required(),
  type: Joi.string().required()
})
