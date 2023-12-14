import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const {userName} = event.context.params

   const user = await prisma.user.findUnique({
      where: {
         user_name: userName,
      },
   })

   return prisma.car.findMany({
      where: {
         listerId: user.id,
      },
      select: {
         city: true,
         image: true,
         id: true,
         name: true,
         price: true,
      },
   })
})
