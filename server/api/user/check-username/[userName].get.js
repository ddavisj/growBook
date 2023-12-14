// Register user details

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const {userName} = event.context.params

   const userNameExists = await prisma.user.findUnique({
      where: {
         user_name: userName,
      },
   })

   return userNameExists

   // if (error) {
   //    throw createError({
   //       statusCode: 412,
   //       statusMessage: error.message,
   //    })
   // }

   // if (!userNameExists) {
   //    await prisma.user.create({
   //       data: {
   //          id: 'f9b867ab-7235-415c-95a8-8b48fe92421a',
   //          first_name: 'Davide',
   //          last_name: 'Hacke',
   //          user_name: userName,
   //       },
   //    })
   // }

   // if (userNameExists) {
   //    throw createError({
   //       statusCode: '404',
   //       message: `Username ${userName} already exists`,
   //    })
   // }
})
