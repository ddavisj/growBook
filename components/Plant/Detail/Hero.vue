<script setup>
   const props = defineProps({
      plant: Object,
   })
   const config = useRuntimeConfig()
</script>

<template>
   <div class="mt-10">
      <img
         :src="`${config.public.supabase.url}/storage/v1/object/public/images/${plant.image}`"
      />
      <h1 class="mt-10 text-4xl">
         {{ plant.commonName }}
      </h1>
      <div
         class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between mr-10"
      >
         <div class="flex">
            <p class="mr-2">
               {{ plant.scientificName }}
            </p>
         </div>
         <div class="font-bold text-2xl">
            {{ plant.age }} days
         </div>
      </div>
   </div>
</template>
