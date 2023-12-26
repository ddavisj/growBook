import Joi from 'joi'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Schema to validate the post req body
const schema = Joi.object({
   // age: Joi.number().min(0).required(),
   // type: Joi.string().required(),
   // commonName: Joi.string().required(),
   //
   // year: Joi.number()
   //    .min(1886)
   //    .max(new Date().getFullYear() + 1),
   // miles: Joi.number().required().min(0),
   // city: Joi.string().min(2).required(),
   // numberOfSeats: Joi.number().min(1).max(1000).required(),
   // description: Joi.string().min(20).required(),
   // features: Joi.array().items(Joi.string()).required(),
   // image: Joi.string().required(),
   // listerId: Joi.string().required(),
   // name: Joi.string().required(),
   // type: info.value.plantType,
   // age: ageInDays,
   // // features: info.value.features.split(', '),
   // commonName: info.value.commonName,
   // // miles: parseInt(info.value.miles),
   // // price: parseInt(info.value.price),
   // // year: parseInt(info.value.year),
   // // name: `${info.value.make} ${info.value.model}`,
   // listerId: user.value.id,
   // image: data.path,
})

export default defineEventHandler(async event => {
   const body = await readBody(event)

   // const { error, value } = schema.validate(body)

   // if (error) {
   //    throw createError({
   //       statusCode: 412,
   //       statusMessage: error.message,
   //    })
   // }

   // const {
   //    type,
   //    age,
   //    commonName,
   //    lengthOfCare,
   //    source,
   //    ideallyIndoor,
   //    currentlyIndoor,
   //    scientificName,
   //    nativeTo,
   //    ecotype,
   //    wateringFreq,
   //    feedingFreq,
   //    availability,
   //    image,
   //    listerId,
   // } = body

   const plant = await prisma.plant.create({
      // data: {
      //    type,
      //    age,
      //    commonName,
      //    image,
      //    listerId,
      // },
      data: body,
   })

   return plant
})
