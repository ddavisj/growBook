export default async id => {
   const { data, error } = await useFetch(
      `/api/plant/${id}`
   )

   if (error.value) {
      throw createError({
         ...error.value,
         statusMessage: `Unable to fetch plant with id of ${id}`,
      })
   }

   return data
}
