export default async userId => {
   const { data, error } = await useFetch(
      `/api/user/get-user-by-uuid/${userId}`
   )

   if (error.value) {
      throw createError({
         ...error.value,
         statusMessage: `Unable to fetch plant with id of ${userId}`,
      })
   }

   return data
}
