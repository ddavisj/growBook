<script setup>
   // growers

   definePageMeta({
      layout: 'thin',
   })

   const UsersStore = useUserstore()

   if (UsersStore.growers.length) {
      // Do nothing
   } else {
      await UsersStore.getUsers()
   }

   // const { data: users, error } = await useFetch(
   //    '/api/users'
   // )
</script>

<template>
   <div class="">
      <div class="flex justify-between mt-24 items-center">
         <h1 class="text-6xl">Growers</h1>
      </div>
      <div>
         <User
            v-for="user in UsersStore.growers"
            :user="user"
            imageSize="24"
            hideFullName
         />
      </div>
   </div>
</template>
