<script setup>
   const user = useSupabaseUser()

   const userPic = ref(null)

   userPic.value = user.value
      ? user.value.user_metadata.picture
      : ''
</script>

<template>
   <NuxtImg
      :src="userPic"
      alt="User image"
      class="rounded-full"
      title="View account"
   ></NuxtImg>
</template>
