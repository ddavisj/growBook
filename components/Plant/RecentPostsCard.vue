<script setup>
   // Note - Plant table in DB uses camelCase.. User table uses snake_case.. Hence different cases below..
   // TODO: Make consistent?

   const props = defineProps({
      listing: Object,
   })

   const UserStore = useUserStore()

   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { howLongAgoPosted } = useDate()

   const { listing } = props

   const user = UserStore.getGrowerByID(listing.listerId)

   // If user deleted but plants remain! Plants may be orphaned..
   // .. Delete user's plants when deleting user!
   import userIcon from '@/assets/user.png'
   let image
   if (user) {
      // ie. if user exists
      image = user.image
         ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.image}`
         : userIcon
   }
</script>

<template>
   <div class="shadow rounded overflow-hidden flex justify-between mb-6 mt-6">
      <div class="flex items-center">
         <div class="">
            <NuxtLink
               class="text-blue-400"
               :to="`/plant/${commonNameHyph}-${listing.id}`"
            >
               <NuxtImg
                  :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
                  class="mr-8 w-[200px] md:w-[400px]"
                  alt=""
               />
            </NuxtLink>
         </div>

         <div>
            <h1 class="text-2xl">
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

            <h3 class="text-l mt-1">
               {{ howLongAgoPosted(listing.created) }}
               ago
            </h3>

            <div class="mt-4" v-if="user">
               <NuxtLink
                  class="text-blue-400 flex items-center mb-4"
                  :to="`/${user.user_name}`"
               >
                  <div>
                     <img
                        class="rounded-full h-12 w-12 md:h-20 md:w-20 mr-2"
                        :src="image"
                     />
                  </div>

                  <div>@{{ user.user_name }}</div>
               </NuxtLink>
            </div>
         </div>
      </div>
   </div>
</template>
