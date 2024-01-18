<script setup>
   // Home page
   definePageMeta({
      layout: 'extra-wide',
   })

   useSeoMeta({
      title: 'growBook',
      ogTitle: 'growBook',
      description: 'The place to share, gift and show your plants',
      ogDescription: 'The place to share, gift and show your plants',
      ogImage: 'https://growbook.vercel.app/opengraph4.jpg',
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
