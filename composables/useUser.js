import userIcon from '@/assets/user.png'

export const useUser = () => {
   const config = useRuntimeConfig()

   const getUserImage = user => {
      const image = user.value.image
         ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.value.image}`
         : userIcon

      return image
   }

   return {
      getUserImage,
   }
}
