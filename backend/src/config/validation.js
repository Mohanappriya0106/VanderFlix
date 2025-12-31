import Joi from "joi";


export const clickTrackValidation = Joi.object({
  experienceId: Joi.string().hex().length(24).required(),
  type: Joi.string().valid("Hotel", "Gear", "Transport", "Tour").required(),
  platform: Joi.string().valid("Amazon", "Flipkart", "Booking", "Redbus", "Other").required()
});

export const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).max(60).required()
});

