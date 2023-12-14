// export default 'PARAMS dont exist'

import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   const {userId} = getQuery(event)

   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   })

   return user
})
