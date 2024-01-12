<script setup>
   const props = defineProps({
      showTitle: Boolean,
   })

   import defaultIcon from '@/assets/user.png'
   const AuthStore = useAuthStore()
   const user = useSupabaseUser()

   const userPic = ref(null)
   const googlePic = user.value.user_metadata.picture

   const renderedTitle = ref('View Account')

   const getUserPic = () => {
      if (AuthStore.uploadedImage) {
         renderedTitle.value = `${AuthStore.username} | View Account`
         return AuthStore.uploadedImage
      } else if (googlePic) {
         renderedTitle.value = !!AuthStore.username
            ? `${AuthStore.username} | View Account (Google pic)`
            : 'View Account (Google pic)'
         // renderedTitle.value = `${View Account (Google pic)`
         return googlePic
      }
      return defaultIcon // 'user.png'
   }

   // userPic.value = getUserPic() // googlePic ? googlePic : 'user.png'

   if (googlePic) {
      userPic.value = googlePic
      renderedTitle.value = 'View Account (Google pic)'
   }
   // :src="googlePic ? googlePic : defaultIcon"
</script>

<template>
   <img
      :src="getUserPic()"
      :title="renderedTitle"
      class="rounded-full"
      alt=""
   />
</template>
