import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   // const { userId } = event.context.params

   // const latestQuery = await prisma.modelName.findMany({
   //    orderBy: {
   //       id: 'desc',
   //    },
   //    take: 1,
   // })

   return prisma.plant.findMany({
      orderBy: {
         created: 'desc',
      },
      take: 5,
   })
})
