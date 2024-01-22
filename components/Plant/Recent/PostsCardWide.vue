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
   <div class="flex flex-row">
      <div class="flex justify-start w-full mr-4">
         <PlantRecentPostsCardImage
            :listing="listing"
            :commonNameHyph="commonNameHyph"
         />
      </div>

      <div
         class="flex flex-col w-1/3 justify-center align-top mt-2"
      >
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
         <div>
            <NuxtLink
               class="text-blue-400 flex items-center mb-4 mt-4"
               :to="`/${user.user_name}`"
            >
               <div>
                  <img
                     class="rounded-full h-12 w-12 md:h-12 md:w-12 mr-2"
                     :src="userImage"
                  />
               </div>

               <div class="flex flex-col align-middle">
                  <div>{{ user.user_name }}</div>
                  <div class="" v-if="user">
                     <h3 class="text-l mt-1">
                        {{
                           howLongAgoPosted(listing.created)
                        }}
                     </h3>
                  </div>
               </div>
            </NuxtLink>
         </div>
      </div>
   </div>
</template>
