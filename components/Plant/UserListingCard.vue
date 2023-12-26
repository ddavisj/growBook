<script setup>
   const props = defineProps({
      listing: Object,
   })

   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   const {toTitleCase} = useUtilities()
</script>

<template>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-4"
   >
      <div class="flex">
         <img
            :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
            alt=""
            class="w-80 mr-3 h-44"
         />
         <div class="p-3">
            <h1 class="text-2xl">{{ listing.name }}</h1>
            <h3 class="text-l">
               {{ toTitleCase(listing.city) }}
            </h3>
            <p class="text-blue-400">
               ${{ listing.price }}
            </p>
         </div>
      </div>
   </div>
</template>
