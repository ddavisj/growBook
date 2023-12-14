import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
   // const body = await readBody(event)
   const {userName} = event.context.params

   const userExists = await prisma.$exists.user({
      username: userName,
   })

   if (userExists) {
      return 'User exists'
   }
})
