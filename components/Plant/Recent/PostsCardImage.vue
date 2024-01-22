<script setup>
   defineProps({
      commonNameHyph: String,
      listing: Object,
   })

   const config = useRuntimeConfig()
</script>

<template>
   <div class="">
      <NuxtLink
         class="text-blue-400"
         :to="`/plant/${commonNameHyph}-${listing.id}`"
      >
         <NuxtImg
            :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
            class="mr-8 w-[400px] sm:w-[500px]"
            alt=""
         />
      </NuxtLink>
   </div>
</template>
