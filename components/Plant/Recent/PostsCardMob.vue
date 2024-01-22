<script setup>
   defineProps({
      listing: Object,
      commonNameHyph: String,
      user: Object,
      userImage: String,
   })

   const { howLongAgoPosted } = useDate()
</script>

<template>
   <div
      class="flex flex-row justify-between w-full align-top mt-2"
   >
      <NuxtLink
         class="text-blue-400 flex items-center mb-4"
         :to="`/${user.user_name}`"
      >
         <div>
            <img
               class="rounded-full h-12 w-12 md:h-20 md:w-20 mr-2"
               :src="userImage"
            />
         </div>

         <div class="flex flex-col align-middle">
            <div>{{ user.user_name }}</div>
            <div class="" v-if="user">
               <h3 class="text-l mt-1">
                  {{ howLongAgoPosted(listing.created) }}
               </h3>
            </div>
         </div>
      </NuxtLink>
   </div>

   <div class="flex justify-end w-full">
      <PlantRecentPostsCardImage
         :listing="listing"
         :commonNameHyph="commonNameHyph"
      />
   </div>

   <div>
      <div>
         <h1 class="text-2xl mt-3">
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
</template>
