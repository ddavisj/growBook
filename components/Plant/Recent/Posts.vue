<script setup>
   const AuthStore = useAuthStore()

   const PostStore = usePostStore()
   PostStore.loadLatestPosts()

   AuthStore.loggedIn && !AuthStore.username
      ? navigateTo('/user/register')
      : ''
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

            <div v-if="!AuthStore.loggedIn">
               <h1 class="mt-8 md:mt-8 text-4xl mb-3">
                  Welcome to growBook!
               </h1>

               <h1
                  class="text-center text-lg sm:text-xl mt-2 mb-6 text-gray-400"
               >
                  A place to gift, share and show off your
                  plants
               </h1>
               <div class="text-center">
                  <NuxtLink to="/signup">
                     <UButton class="text-lg"
                        >Register now</UButton
                     >
                  </NuxtLink>
               </div>
            </div>
            <li
               v-else
               class="text-blue-400 mt-8 text-3xl mb-3"
            >
               <NuxtLink
                  v-if="AuthStore.firstName"
                  to="/profile/plants/create"
               >
                  Hey {{ AuthStore.firstName }}, add a
                  plant!
               </NuxtLink>
               <NuxtLink v-else to="/user/register">
                  Update registration to add plants!
               </NuxtLink>
            </li>
         </div>
      </template>

      <div>
         <div
            class="mb-3 mt-4 w-full flex flex-row items-center justify-center"
         >
            <div
               class="flex items-center justify-center sm:justify-start"
            >
               <UIcon
                  name="i-ph-plant-bold"
                  size="3em"
                  class="mr-3"
                  dynamic
               />
               <h1 class="text-4xl">Recently Added</h1>
            </div>
         </div>
         <div class="flex justify-items-center">
            <div class="">
               <PlantRecentPostsCard
                  v-for="(plant, index) in PostStore.posts"
                  :key="plant.id"
                  :listing="plant"
                  :showDivider="
                     index !== PostStore.posts.length - 1
                  "
               />
            </div>
         </div>
      </div>

      <template #footer>
         <div class="flex w-full flex-col items-center">
            <div class="mt-4 mb-2 flex items-center">
               <h1 class="text-4xl">What next?</h1>
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
                  <li
                     v-if="AuthStore.username"
                     class="text-blue-400 mt-3 text-xl"
                  >
                     <NuxtLink to="/profile/plants/create">
                        Add a plant!
                     </NuxtLink>
                  </li>
                  <li v-else>
                     <NuxtLink to="/user/register">
                        Update registration to add plants!
                     </NuxtLink>
                  </li>
               </div>
               <div>
                  <li
                     class="text-blue-400 text-xl mt-3 mb-6"
                  >
                     <NuxtLink to="/growers">
                        Check out our growers
                     </NuxtLink>
                  </li>
               </div>
            </div>
         </div>
      </template>
   </UCard>
</template>
