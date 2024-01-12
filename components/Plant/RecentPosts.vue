<script setup>
   const { data: plants } = await useFetch(
      `/api/plant/listings/get-latest`
   )

   const AuthStore = useAuthStore()
</script>

<template>
   <UCard
      class="sm:mt-6"
      :ui="{
         background: 'bg-white dark:bg-black',
         ring: 'ring-2 ring-gray-200 dark:ring-gray-900',
         divide: 'dark:divide-y-4 dark:divide-gray-900',
         shadow: 'shadow',
         rounded: 'md:rounded-3xl',
      }"
   >
      <template #header>
         <div class="flex flex-col items-center">
            <img
               class="rounded-3xl"
               src="/banner-wide.jpg"
            />
            <h1 class="mt-8 md:mt-8 text-4xl mb-3">
               Welcome to growBook!
            </h1>

            <h1 class="text-xl mt-2 mb-6 text-gray-400">
               The place to gift, share and show off your
               plants
            </h1>
         </div>
      </template>

      <div>
         <div class="mb-3 mt-4 flex items-center">
            <UIcon
               name="i-ph-plant-bold"
               size="3em"
               class="mr-3"
               dynamic
            />
            <h1 class="text-4xl">Recently Added</h1>
         </div>
         <div class="flex justify-items-center">
            <div class="">
               <PlantRecentPostsCard
                  v-for="plant in plants"
                  :key="plant.id"
                  :listing="plant"
               />
            </div>
         </div>
      </div>

      <template #footer>
         <div class="flex w-full flex-col items-center">
            <div class="mt-4 mb-2 flex items-center">
               <h1 class="text-4xl">Get involved</h1>
            </div>
            <div>
               <div v-if="!AuthStore.loggedIn">
                  <li
                     class="mt-3 mb-3 text-blue-400 text-xl"
                  >
                     <NuxtLink to="/signup">
                        Join us and start sharing!
                     </NuxtLink>
                  </li>
               </div>
               <div v-else>
                  <li class="text-blue-400 mt-3 text-xl">
                     <NuxtLink to="/profile/plants/create">
                        Get started by adding a plant!
                     </NuxtLink>
                  </li>
               </div>
               <div>
                  <li
                     class="text-blue-400 text-xl mt-3 mb-6"
                  >
                     <NuxtLink to="/users">
                        Check out our growers
                     </NuxtLink>
                  </li>
               </div>
            </div>
         </div>
      </template>
   </UCard>
</template>
