<script setup>
   // View other user profile (not logged-in user)
   definePageMeta({
      layout: 'custom',
   })

   const route = useRoute()
   const { userName } = route.params

   const { data: listings } = await useFetch(
      `/api/user/profile/${userName}`
   )
</script>

<template>
   <h1 class="text-6xl mb-3 mt-24">
      {{ userName }}'s plants
   </h1>
   <div>
      <div class="shadow rounded p-3 mt-5">
         <PlantUserListingCard
            v-for="listing in listings"
            :key="listing.id"
            :listing="listing"
         />
      </div>
   </div>
</template>
