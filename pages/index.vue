<script setup>
   // Home page
   definePageMeta({
      layout: 'home',
   })

   useSeoMeta({
      title: 'growBook - Share some plant',
      ogTitle: 'growBook - Share some plant',
      description:
         'A place to share, gift and show your plants',
      ogDescription:
         'A place to share, gift and show your plants',
      ogImage: 'https://growbook.vercel.app/opengraph4.jpg',
   })

   const UserStore = useUserStore()
   UserStore.loadGrowers()
</script>

<template>
   <div>
      <PlantRecentPosts />
      <NuxtLink
         target="_blank"
         to="https://eadigital.com.au"
      >
         <div
            class="mt-10 w-full flex justify-center dark:text-lime-600 text-lg"
         >
            {{ `EA Digital ©${new Date().getFullYear()}` }}
         </div>
      </NuxtLink>
   </div>
</template>
