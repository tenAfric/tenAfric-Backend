const Joi = require('@hapi/joi')

const contactSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    message: Joi.string().required()
});

module.exports = { contactSchema }