<script setup>
   const props = defineProps({
      listing: Object,
   })

   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   // const { toTitleCase } = useUtilities()
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-4"
   >
      <div class="flex">
         <img
            :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
            alt=""
            class="mr-3 h-44 w-auto"
         />
         <div class="p-3">
            <h1 class="text-2xl">
               {{ listing.commonName }}
            </h1>
            <h3 class="text-l mt-1">
               {{ listing.scientificName }}
            </h3>
            <!-- <p class="text-blue-400">
               ${{ listing.price }}
            </p> -->
         </div>
      </div>
   </div>
</template>
