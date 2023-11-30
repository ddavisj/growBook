<script setup>
   const route = useRoute()

   const minPrice = computed(() => route.query.minPrice)
   const maxPrice = computed(() => route.query.maxPrice)

   const make = route.params.make

   const {data: cars, refresh} = await useFetchCars(
      route.params.city,
      {
         make,
         minPrice,
         maxPrice,
      }
   )

   watch(
      () => route.query,
      () => refresh()
   )
</script>

<template>
   <div>
      <CarCards v-if="cars && cars.length" :cars="cars" />
      <h1 v-else class="text-red-600">
         No cars found with these filters
      </h1>
   </div>
</template>
