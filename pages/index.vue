<script setup>
   // Home page
   definePageMeta({
      layout: 'extra-wide',
   })

   useHead({
      title: 'growBook',
   })

   const UserStore = useUserStore()
   UserStore.getUsers()
</script>

<template>
   <div>
      <PlantRecentPosts />
      <NuxtLink target="_blank" to="https://eadigital.com.au">
         <div
            class="mt-10 w-full flex justify-center dark:text-lime-600 text-lg"
         >
            {{ `EA Digital ©${new Date().getFullYear()}` }}
         </div>
      </NuxtLink>
   </div>
</template>
