<script setup>
   const user = useSupabaseUser()
</script>

<template>
   <NuxtImg
      :src="user.user_metadata.picture"
      alt="User image"
      class="rounded-full"
      title="View account"
   ></NuxtImg>
</template>
