<script setup>
   // Home page
   definePageMeta({
      layout: 'home',
      middleware: ['check-first-login'],
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

   const AuthStore = useAuthStore()

   // Redirect to login if query code exists / new regn
   const route = useRoute()
   route.query.code ? navigateTo('/login') : ''

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
