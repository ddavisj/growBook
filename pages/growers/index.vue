<script setup>
   // growers

   definePageMeta({
      layout: 'thin',
   })

   const UserStore = useUserStore()

   if (UserStore.growers.length) {
      // Do nothing
   } else {
      await UserStore.loadGrowers()
   }

   useSeoMeta({
      title: 'Growers - growBook',
      ogTitle: 'Growers - growBook',
      description: 'A list of all our growers',
      ogDescription: 'A list of all our growers',
      ogImage: 'https://growbook.vercel.app/opengraph4.jpg',
   })
</script>

<template>
   <div class="">
      <div class="flex justify-between mt-24 items-center">
         <h1 class="text-6xl">Growers</h1>
      </div>
      <div>
         <User
            v-for="user in UserStore.growers"
            :user="user"
            imageSize="24"
            hideFullName
         />
      </div>
   </div>
</template>
