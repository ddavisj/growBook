import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async event => {
   // const supabase = useSupabaseClient()

   const { id } = event.context.params

   const { data, error } =
      await serverSupabaseClient.auth.admin.getUserById(id)

   return data
})
