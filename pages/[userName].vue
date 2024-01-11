<script setup>
   // Public user profile
   definePageMeta({
      layout: 'extra-wide',
   })

   const route = useRoute()
   const { userName } = route.params

   const { data: listings } = await useFetch(
      `/api/user/profile/${userName}`
   )

   const { data: user } = await useFetch(
      `/api/user/get-user-by-username/${userName}`
   )
</script>

<template>
   <UCard
      class="sm:mt-6"
      :ui="{
         background: 'bg-white dark:bg-black',
         ring: 'ring-2 ring-gray-200 dark:ring-gray-900',
         divide: 'dark:divide-y-4 dark:divide-gray-900',
         shadow: 'shadow',
         rounded: 'sm:rounded-3xl',
      }"
   >
      <template #header>
         <div>
            <h1 class="text-6xl mb-3 mt-24">
               @{{ userName }}
            </h1>
         </div>
      </template>

      <div>
         <User :user="user" hideUserName imageSize="12" />
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
                        size: {
                           horizontal: 'dark:border-t-4',
                        },
                        base: 'border-gray-100 dark:border-gray-900',
                     },
                  }"
               />
            </div>
         </div>
      </template>
   </UCard>
</template>
