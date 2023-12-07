// code base
const Joi = require('joi');

const bookValidator = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    author: Joi.string().required(),
})

module.exports = bookValidator