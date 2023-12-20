<script setup>
   const user = useSupabaseUser()

   const userPic = ref(null)

   const props = defineProps({
      showTitle: Boolean,
   })

   console.log('value', user.value)
   console.log('meta', user.value.user_metadata)
   console.log('pic', user.value.user_metadata.picture)
   // userPic.value = 'user.png'
   // userPic.value = user.value
   const googlePic = user.value.user_metadata.picture
   userPic.value = googlePic ? googlePic : 'user.png'
   // ;('')
</script>

<template>
   <NuxtImg
      v-if="userPic"
      :src="userPic"
      alt="User image"
      class="rounded-full"
      :title="showTitle ? 'View account' : null"
   ></NuxtImg>
</template>
