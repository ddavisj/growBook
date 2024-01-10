<script setup>
   const props = defineProps({
      listing: Object,
   })

   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   // Hyphenate common name for plant details url
   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()

   const { getPlantAge } = useDate()

   const { listing } = props
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-6 mt-6"
   >
      <div class="flex items-center">
         <NuxtLink
            class="text-blue-400"
            :to="`/plant/${commonNameHyph}-${listing.id}`"
         >
            <NuxtImg
               :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
               width="400"
               alt=""
               class="mr-3 h-50"
            />
         </NuxtLink>
         <div class="ml-4">
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
               {{ getPlantAge(listing.bday) }}
            </h3>
         </div>
      </div>
   </div>
</template>
