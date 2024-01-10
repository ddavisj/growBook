<script setup>
   const props = defineProps({
      listing: Object,
   })

   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { getPlantAge } = useDate()

   const { listing } = props

   const { data: user } = await useFetch(
      `/api/user/get-user-by-uuid/${listing.listerId}`
   )

   const { getUserImage } = useUser()
   const image = getUserImage(user)

   // <div class="h-auto max-w-24">
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
                  width="400"
                  class="mr-8"
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
               <UTooltip text="Estimated age">
                  {{ getPlantAge(listing.bday) }}
               </UTooltip>
            </h3>

            <div class="mt-4">
               <NuxtLink
                  class="text-blue-400 flex items-center mb-4"
                  :to="`/${user.user_name}`"
               >
                  <div>
                     <img
                        class="rounded-full h-20 w-20 md:h-10 md:w-10 mr-2"
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
