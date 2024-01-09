// Update image

// import Joi from 'joi'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// const user = useSupabaseUser()

// const schema = Joi.object({
//    userName: Joi.string().required(),
//    firstName: Joi.string().required(),
//    lastName: Joi.string().required(),
//    userId: Joi.string().required(),
//    city: Joi.string().required(),
//    country: Joi.string().required(),
// })

export default defineEventHandler(async event => {
   const body = await readBody(event)

   const { userId, description, image } = body

   // const userNameExists = await prisma.user.findUnique({
   //    where: {
   //       user_name: userName,
   //    },
   // })

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

   await prisma.user.update({
      where: {
         id: userId,
      },
      data: {
         image: image || undefined, // if image is undef, then use RHS (undefined), ie. don't update
         description: description || undefined,
      },
   })

   // // if (!userNameExists) {
   // await prisma.user.update({
   //    data: {
   //       // id: userId,
   //       // first_name: firstName,
   //       // last_name: lastName,
   //       // user_name: userName,
   //       // city,
   //       // country,
   //       image: body.image,
   //    },
   //    // data: body,
   // })
   // }

   // if (userNameExists) {
   //    throw createError({
   //       statusCode: '414',
   //       message: 'Username already exists',
   //    })
   // }
   return body
})
