<script setup>
   // View other user profile (not logged-in user)
   definePageMeta({
      layout: 'custom',
   })

   const route = useRoute()
   const { userName } = route.params

   import userIcon from '@/assets/user.png'

   const { data: listings } = await useFetch(
      `/api/user/profile/${userName}`
   )

   const { data: user } = await useFetch(
      `/api/user/get-user-by-username/${userName}`
   )

   console.log({ user })
   console.log('U V:', user.value.image)

   const config = useRuntimeConfig()

   const image = user.value.image
      ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.value.image}`
      : userIcon
   // const image = `${config.public.supabase.url}/storage/v1/object/public/images/${user.value.image}`

   // console.log({ listings })
</script>

<template>
   <h1 class="text-6xl mb-3 mt-24">@{{ userName }}</h1>
   <div class="flex items-center mb-4 mt-8">
      <div class="mr-4">
         <img
            class="rounded-full mr-4 h-20 w-20 md:h-24 md:w-24"
            :src="image"
         />
      </div>
      <div>
         <div class="text-xl">
            {{ user.first_name }} {{ user.last_name }}
         </div>
         <div class="text-l text-white">
            {{ user.city }}, {{ user.country }}
         </div>
         <div class="text-l text-white">
            {{ user.description }}
         </div>
      </div>
   </div>

   <div>
      <div class="shadow rounded p-3 mt-5">
         <PlantUserListingCard
            v-for="listing in listings"
            :key="listing.id"
            :listing="listing"
         />
      </div>
   </div>
</template>
