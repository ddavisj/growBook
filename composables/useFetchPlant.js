export default async id => {
   const { data, error } = await useFetch(
      `/api/plant/${id}`
   )

   // if (error.value) {
   //    throw createError({
   //       statusCode: error.value.statusCode,
   //       statusMessage: error.value.statusMessage,
   //    })
   // }

   if (error.value) {
      throw createError({
         ...error.value,
         statusMessage: `Unable to fetch plant with id of ${id}`,
      })
   }

   return data
}
