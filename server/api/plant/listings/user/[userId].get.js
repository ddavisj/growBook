import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const { userId } = event.context.params

   return prisma.plant.findMany({
      where: {
         listerId: userId,
      },
      orderBy: {
         created: 'desc',
      },
   })
})
