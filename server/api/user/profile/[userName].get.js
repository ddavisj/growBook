import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const { userName } = event.context.params

   const user = await prisma.user.findUnique({
      where: {
         user_name: userName,
      },
   })

   return prisma.plant.findMany({
      where: {
         listerId: user.id,
      },
      select: {
         commonName: true,
         image: true,
         id: true,
         scientificName: true,
         bday: true,
         // name: true,
         // price: true,
      },
      orderBy: {
         created: 'desc',
      },
   })
})
