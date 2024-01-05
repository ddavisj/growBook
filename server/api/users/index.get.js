import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   // const { userId } = event.context.params

   return prisma.user.findMany({
      // where: {
      //    listerId: userId,
      // },
      // select: {
      //    user_name: true,
      //    image: true,
      //    id: true,
      //    name: true,
      //    price: true,
      // },
   })
})
