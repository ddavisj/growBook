<script setup>
   // My listings - viewable by user only

   definePageMeta({
      layout: 'wide',
   })

   const user = useSupabaseUser()

   const { data: listings } = await useFetch(
      `/api/plant/listings/user/${user.value.id}`
   )

   const handleDelete = async id => {
      await $fetch(`/api/plant/listings/${id}`, {
         method: 'delete',
      })
      listings.value = listings.value.filter(
         listing => listing.id !== id
      )
   }
</script>

<template>
   <div>
      <div class="flex justify-between mt-24 items-center">
         <h1 class="text-6xl">My Plants</h1>
         <PlantAddButton link="/profile/plants/create" />
      </div>
      <h3 class="text-xl text-blue-400 mt-5">
         <NuxtLink to="/user/account">My account</NuxtLink>
      </h3>
      <div class="shadow rounded p-3 mt-5">
         <PlantMyListingCard
            v-for="listing in listings"
            :key="listing.id"
            :listing="listing"
            @delete-click="handleDelete"
         />
      </div>
   </div>
</template>
