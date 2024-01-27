<script setup>
   const props = defineProps({
      listing: Object,
   })

   const emits = defineEmits(['deleteClick'])
   const config = useRuntimeConfig()

   const isOpen = ref(false)

   const commonNameHyph = props.listing.commonName
      .replace(/\s+/g, '-')
      .toLowerCase()
</script>

<template>
   <UModal v-model="isOpen">
      <div class="p-4 h-32">
         <div class="text-center">
            <span>Delete {{ listing.commonName }}?</span>
         </div>
         <div class="mt-6 flex justify-between">
            <UButton
               color="blue"
               label="Cancel"
               @click="isOpen = false"
            />
            <UButton
               color="red"
               label="Delete"
               @click="emits('deleteClick', listing.id)"
            />
         </div>
      </div>
   </UModal>
   <div
      class="shadow rounded overflow-hidden flex justify-between mb-4"
   >
      <div class="flex">
         <div class="max-w-md">
            <NuxtLink
               :to="`/plant/${commonNameHyph}-${listing.id}`"
            >
               <img
                  :src="`${config.public.supabase.url}/storage/v1/object/public/images/${listing.image}`"
                  alt=""
                  class="mr-3 h-50 w-auto"
               />
            </NuxtLink>
         </div>
         <div class="ml-4 p-3">
            <h1 class="text-2xl text-blue-400 mb-3">
               <NuxtLink
                  :to="`/plant/${commonNameHyph}-${listing.id}`"
               >
                  {{ listing.commonName }}
               </NuxtLink>
            </h1>
            <h1 class="text-md text-gray-300">
               {{ listing.scientificName }}
            </h1>
            <p class="text-blue-400 mb-10">
               {{ listing.price }}
            </p>

            <div class="mb-2">
               <NuxtLink
                  :to="`/profile/plants/edit/${listing.id}`"
               >
                  <div
                     class="flex items-center text-blue-400"
                  >
                     <UIcon
                        name="i-heroicons-pencil"
                        size="1.25em"
                        class="mr-3"
                        dynamic
                     />
                     <span class="hidden md:inline"
                        >Edit</span
                     >
                  </div>
               </NuxtLink>
            </div>

            <!-- <div class="mb-2">
               <NuxtLink
                  :to="`/profile/listings/view/${listing.id}`"
               >
                  <div
                     class="flex items-center text-blue-400"
                  >
                     <UIcon
                        name="i-ic-outline-email"
                        size="1.25em"
                        class="mr-3"
                        dynamic
                     />
                     <span class="hidden md:inline"
                        >Messages</span
                     >
                  </div>
               </NuxtLink>
            </div> -->

            <div
               class="cursor-pointer flex flex-row items-center text-red-400"
               @click="isOpen = true"
            >
               <UIcon
                  name="i-ic-baseline-delete-outline"
                  size="1.4em"
                  class="mr-3"
                  dynamic
               />
               <span class="hidden md:inline">Delete</span>
            </div>
         </div>
      </div>
   </div>
</template>
