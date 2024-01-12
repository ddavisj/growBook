<script setup>
   // User listings - public page
   definePageMeta({
      layout: 'custom',
      middleware: ['page-auth'],
   })

   const route = useRoute()
   const { userId } = route.params

   const { data: listings } = await useFetch(
      `/api/car/listings/user/${userId}`
   )
</script>

<template>
   {{ userId }}

   <template>
      <div>
         <div class="shadow rounded p-3 mt-5">
            <CarMyListingCard
               v-for="listing in listings"
               :key="listing.id"
               :listing="listing"
            />
         </div>
      </div>
   </template>
</template>
