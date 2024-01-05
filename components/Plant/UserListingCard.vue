<script setup>
   const props = defineProps({
      listing: Object,
   })

   console.log('L: ', props.listing)
   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-4"
   >
      <div class="flex">
         <NuxtLink
            class="text-blue-400"
            :to="`/plant/${commonNameHyph}-${listing.id}`"
         >
            <NuxtImg
               :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
               alt=""
               class="mr-3 h-50 w-auto"
            />
         </NuxtLink>
         <div class="p-3">
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
         </div>
      </div>
   </div>
</template>
