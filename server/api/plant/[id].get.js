import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const { id } = event.context.params

   const plant = await prisma.plant.findUnique({
      where: {
         id: parseInt(id),
      },
   })

   if (!plant) {
      throw createError({
         statusCode: '404',
         message: `Plant with ID of ${id} does not exist`,
      })
   }

   return plant
})
