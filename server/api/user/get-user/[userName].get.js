// Get user's public profile (not G profile) from username
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   // Params provided!

   const {userName} = event.context.params

   const user = await prisma.user.findUnique({
      where: {
         user_name: userName,
      },
   })

   return user
})
