<script setup>
   definePageMeta({
      layout: 'custom',
   })

   const { data: users, error } = await useFetch(
      '/api/users'
   )
</script>

<template>
   <div class="flex justify-between mt-24 items-center">
      <h1 class="text-6xl">Growers</h1>
   </div>
   <div>
      <User
         v-for="user in users"
         :user="user"
         imageSize="24"
      />
   </div>
</template>
