<script setup>
   // Home page
   definePageMeta({
      layout: 'extra-wide',
   })

   // defineOgImageComponent('NuxtSeo', {
   //    headline: "growers 'n friends",
   //    title: 'Welcome to growBook 🌿',
   //    description: 'The place to share, gift and show your plants',
   // })

   defineOgImageComponent('BlogPost', {
      title: 'The place to gift, share and show off your plants',
      borderColor: 'green-600',
   })

   useHead({
      title: 'growBook',
   })

   const UserStore = useUserStore()
   UserStore.loadGrowers()
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
