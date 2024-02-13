<script setup>
   // Note - Plant table in DB uses camelCase.. User table uses snake_case.. Hence different cases below..
   // TODO: Make consistent?

   const props = defineProps({
      listing: Object,
      showDivider: Boolean,
   })

   const { howLongAgoPosted } = useDate()

   const UserStore = useUserStore()

   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { listing } = props

   // User details
   const user = UserStore.getLoadedGrowerByID(
      listing.listerId
   )

   // If user deleted but plants remain! Plants may be orphaned..
   // .. Delete user's plants when deleting user!
   import userIcon from '@/assets/user.png'
   let userImage
   if (user) {
      // ie. if user exists
      userImage = user.image
         ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.image}`
         : userIcon
   }
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-6 mt-6"
   >
      <div class="flex items-center flex-col sm:flex-row">
         <!-- MOBILE -->
         <div class="sm:hidden w-full">
            <div
               class="flex flex-row justify-between w-full align-top mt-2"
            >
               <NuxtLink
                  class="text-blue-400 flex items-center mb-4"
                  :to="`/${user.user_name}`"
               >
                  <div>
                     <img
                        class="rounded-full h-12 w-12 md:h-20 md:w-20 mr-2"
                        :src="userImage"
                     />
                  </div>

                  <div class="flex flex-col align-middle">
                     <div>{{ user.user_name }}</div>
                     <div class="" v-if="user">
                        <h3 class="text-l mt-1">
                           {{
                              howLongAgoPosted(
                                 listing.created
                              )
                           }}
                        </h3>
                     </div>
                  </div>
               </NuxtLink>
            </div>

            <div class="flex justify-end w-full">
               <PlantRecentPostsCardImage
                  :listing="listing"
                  :commonNameHyph="commonNameHyph"
               />
            </div>

            <div>
               <div>
                  <h1 class="text-2xl mt-3">
                     <NuxtLink
                        class="text-blue-400"
                        :to="`/plant/${commonNameHyph}-${listing.id}`"
                     >
                        {{ listing.commonName }}
                     </NuxtLink>
                  </h1>
                  <h3 class="text-l mt-1">
                     {{ listing.scientificName }}
                  </h3>
               </div>
            </div>

            <div
               v-if="showDivider"
               class="w-full mt-9 mb-0"
            >
               <UDivider
                  :ui="{
                     border: {
                        size: {
                           horizontal: 'dark:border-t-4',
                        },
                        base: 'border-gray-600 dark:border-gray-900',
                     },
                  }"
               />
            </div>
         </div>
         <!-- // END MOBILE -->

         <!-- WIDE -->
         <div class="hidden sm:block">
            <div class="flex flex-row">
               <div class="flex justify-start w-full mr-4">
                  <PlantRecentPostsCardImage
                     :listing="listing"
                     :commonNameHyph="commonNameHyph"
                  />
               </div>

               <div
                  class="flex flex-col w-1/3 justify-center align-top mt-2"
               >
                  <div>
                     <h1 class="text-2xl mt-3">
                        <NuxtLink
                           class="text-blue-400"
                           :to="`/plant/${commonNameHyph}-${listing.id}`"
                        >
                           {{ listing.commonName }}
                        </NuxtLink>
                     </h1>
                     <h3 class="text-l mt-1">
                        {{ listing.scientificName }}
                     </h3>
                  </div>
                  <div>
                     <NuxtLink
                        class="text-blue-400 flex items-center mb-4 mt-4"
                        :to="`/${user.user_name}`"
                     >
                        <div>
                           <img
                              class="rounded-full h-12 w-12 md:h-12 md:w-12 mr-2"
                              :src="userImage"
                           />
                        </div>

                        <div
                           class="flex flex-col align-middle"
                        >
                           <div>{{ user.user_name }}</div>
                           <div class="" v-if="user">
                              <h3 class="text-l mt-1">
                                 {{
                                    howLongAgoPosted(
                                       listing.created
                                    )
                                 }}
                              </h3>
                           </div>
                        </div>
                     </NuxtLink>
                  </div>
               </div>
            </div>
         </div>
         <!-- // END WIDE -->
      </div>
   </div>
</template>
