<script setup>
   const props = defineProps({
      listing: Object,
   })

   const UsersStore = useUserstore()

   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { howLongAgoPosted } = useDate()
   // const { getUserImage } = useUser()

   const { listing } = props

   // const { data: user } = await useFetch(
   //    `/api/user/get-user-by-uuid/${listing.listerId}`
   // )

   const user = UsersStore.getGrowerByID(listing.listerId)

   // console.log(user)

   // If user deleted but plants remain! Plants may be orphaned.. (don't delete user w.o deleting plants!)

   import userIcon from '@/assets/user.png'
   let image
   if (user) {
      image = user.image
         ? `${config.public.supabase.url}/storage/v1/object/public/images/${user.image}`
         : userIcon
      // image = getUserImage(user)
   }
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-6 mt-6"
   >
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
               <UTooltip text="Estimated plant age">
                  {{ howLongAgoPosted(listing.created) }}
                  ago
               </UTooltip>
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
