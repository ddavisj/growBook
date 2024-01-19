import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   return prisma.plant.findMany({
      orderBy: {
         created: 'desc',
      },
      take: 5,
   })
})
