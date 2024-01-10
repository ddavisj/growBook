<script setup>
   // View other user profile (not logged-in user)
   definePageMeta({
      layout: 'custom',
   })

   const route = useRoute()
   const { userName } = route.params

   const { data: listings } = await useFetch(
      `/api/user/profile/${userName}`
   )

   const { data: user } = await useFetch(
      `/api/user/get-user-by-username/${userName}`
   )

   import userIcon from '@/assets/user.png'
   const config = useRuntimeConfig()
   const image = user.value.image
      ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.value.image}`
      : userIcon
</script>

<template>
   <UCard
      :ui="{
         background: 'bg-white dark:bg-black',
         ring: 'ring-2 ring-gray-200 dark:ring-gray-900',
         divide: 'dark:divide-y-4 dark:divide-gray-900',
         shadow: 'shadow',
         rounded: 'rounded-3xl',
      }"
   >
      <template #header>
         <div>
            <h1 class="text-6xl mb-3 mt-24">
               @{{ userName }}
            </h1>
         </div>
      </template>

      <div class="flex items-center">
         <div class="">
            <div class="mr-4">
               <img
                  class="rounded-full mr-4 h-20 w-20 md:h-24 md:w-24"
                  :src="image"
               />
            </div>
         </div>

         <div>
            <div class="text-2xl mb-1">
               {{ user.first_name }} {{ user.last_name }}
            </div>
            <div class="text-l text-white">
               {{ user.description }}
            </div>
            <div class="text-l text-gray-500">
               {{ user.city }}, {{ user.country }}
            </div>
         </div>
      </div>

      <template #footer>
         <div>
            <div
               v-for="(listing, index) in listings"
               class="shadow rounded"
            >
               <UserListingCard
                  :key="listing.id"
                  :listing="listing"
               />
               <UDivider
                  v-if="index !== listings.length - 1"
                  :ui="{
                     border: {
                        size: { horizontal: 'border-t-4' },
                        base: 'border-gray-900 dark:border-gray-900',
                     },
                  }"
               />
            </div>
         </div>
      </template>
   </UCard>
</template>
