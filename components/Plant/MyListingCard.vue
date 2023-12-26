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
         <div class="max-w-md">
            <img
               :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
               alt=""
               class="mr-3 h-50 w-auto"
            />
         </div>
         <div class="ml-4 p-3">
            <h1 class="text-2xl">
               {{ listing.commonName }}
            </h1>
            <h1 class="text-sm">
               {{ listing.scientificName }}
            </h1>
            <h3 class="text-l">
               {{ listing.type }}
            </h3>
            <p class="text-blue-400">
               {{ listing.price }}
            </p>
         </div>
      </div>
      <div class="p-3 flex flex-col">
         <div
            class="flex flex-row items-center mt-2 text-blue-400"
         >
            <UIcon
               name="i-ic-outline-email"
               size="1em"
               class="mr-3"
               dynamic
            />

            <NuxtLink
               class="mr-5"
               :to="`/profile/listings/view/${listing.id}`"
               >Messages</NuxtLink
            >
         </div>
         <div
            class="flex flex-row items-center mt-2 text-red-400"
         >
            <UIcon
               name="i-material-symbols-delete"
               size="1em"
               class="mr-3"
               dynamic
            />
            <p
               class="cursor-pointer"
               @click="emits('deleteClick', listing.id)"
            >
               Delete
            </p>
         </div>
      </div>
   </div>
</template>
