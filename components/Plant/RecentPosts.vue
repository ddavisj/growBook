<script setup>
   // View other user profile (not logged-in user)

   const { data: plants } = await useFetch(
      `/api/plant/listings/get-latest`
   )

   // const { data: user } = await useFetch(
   //    `/api/user/get-user-by-username/${userName}`
   // )

   // import userIcon from '@/assets/user.png'
   // const config = useRuntimeConfig()
   // const image = user.value.image
   //    ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.value.image}`
   //    : userIcon
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
         <h1 class="mt-24 text-4xl mb-6">
            Welcome to growBook!
         </h1>

         <h1 class="text-xl mt-6 mb-6">
            A place to grow, gift and share plants
         </h1>
      </template>

      <div>
         <!-- <h1 class="text-4xl">Come on</h1> -->
         <h3 class="mt-3 mb-3 text-blue-400 text-xl">
            <NuxtLink to="/signup">
               Join us and start sharing!
            </NuxtLink>
         </h3>
      </div>

      <template #footer>
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
      </template>
   </UCard>
</template>
