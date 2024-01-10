<script setup>
   const props = defineProps({
      listing: Object,
      index: Number,
   })

   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   console.log('index', props.index)

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
               alt=""
               class="mr-3 h-50 w-auto w-[90%]"
            />
         </NuxtLink>
         <div class="">
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
