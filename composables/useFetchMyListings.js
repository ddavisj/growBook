export default async userId => {
   const {data, error} = await useFetch(
      `/api/car/listings/user/${userId}`
   )
   if (error.value) {
      throw createError({
         ...error.value,
         statusMessage: 'Unable to fetch my listings',
      })
   }

   return {data}
}
