// Register user details
import Joi from 'joi'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const schema = Joi.object({
   userName: Joi.string().required(),
   firstName: Joi.string().required(),
   lastName: Joi.string().required(),
   userId: Joi.string().required(),
})

export default defineEventHandler(async event => {
   const body = await readBody(event)

   const {error, value} = schema.validate(body)

   if (error) {
      throw createError({
         statusCode: 412,
         statusMessage: error.message,
      })
   }

   // const {userName} = event.context.params

   const {userName, firstName, lastName, userId} = body

   const userNameExists = await prisma.user.findUnique({
      where: {
         user_name: userName,
      },
   })

   // const userIdExists = await prisma.user.findUnique({
   //    where: {
   //       id: userId,
   //    },
   // })

   // if (userIdExists) {
   //    throw createError({
   //       statusCode: '414',
   //       message: 'User already registered',
   //    })
   // }

   if (!userNameExists) {
      await prisma.user.create({
         data: {
            id: userId,
            first_name: firstName,
            last_name: lastName,
            user_name: userName,
         },
      })
   }

   if (userNameExists) {
      throw createError({
         statusCode: '414',
         message: 'Username already exists',
      })
   }

   return userNameExists
})
