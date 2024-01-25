<script setup>
   const props = defineProps({
      plant: Object,
   })
   const config = useRuntimeConfig()

   const { getPlantAge, howLongAgoPosted } = useDate()
</script>

<template>
   <div class="mt-10">
      <img
         :src="`${config.public.supabase.url}/storage/v1/object/public/images/${plant.image}`"
      />
      <div class="flex justify-between items-end">
         <div>
            <h1 class="mt-10 text-4xl">
               {{ plant.commonName }}
            </h1>
         </div>
         <h2 class="mt-10 text-xl">
            {{ howLongAgoPosted(plant.created) }} ago
         </h2>
      </div>

      <div
         class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between"
      >
         <div class="">
            <p class="mr-2">
               {{ plant.scientificName }}
            </p>
            <p class="">
               {{ getPlantAge(plant.bday) }} old
            </p>
         </div>
      </div>
   </div>
</template>
