<script setup>
   const route = useRoute()

   const { toTitleCase } = useUtilities()

   useHead({
      title: toTitleCase(route.params.name),
   })

   // Get ID from route - check hyphenation
   const { name, id: routeId } = route.params

   const term = !name.includes('-')
      ? name + '-' + routeId
      : name + routeId

   const split = term.split('-')
   const id = split[split.length - 1]

   // Fetch plant data
   const plant = await useFetchPlant(id)

   if (!plant.value) {
      throw createError({
         statusCode: '404',
         message: `Plant with ID of ${route.params.id} does not exist`,
      })
   }

   definePageMeta({
      layout: 'custom',
   })
</script>

<template>
   <div v-if="plant">
      <PlantDetailHero :plant="plant" />
      <PlantDetailAttributes
         :features="[
            plant.source,
            plant.nativeTo,
            plant.indoor,
            plant.ecotype,
         ]"
      />
      <PlantDetailDescription
         :description="plant.description"
      />
      <PlantDetailContact />
   </div>
</template>
