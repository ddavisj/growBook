<script setup>
   const user = useSupabaseUser()

   const userPic = ref(null)

   const props = defineProps({
      showTitle: Boolean,
   })

   const googlePic = user.value.user_metadata.picture
   userPic.value = googlePic ? googlePic : 'user.png'
</script>

<template>
   <NuxtImg
      :src="userPic"
      alt="User image"
      class="rounded-full"
      :title="showTitle ? 'View account' : null"
   ></NuxtImg>
</template>
