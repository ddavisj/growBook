<script setup>
   const props = defineProps({
      features: Array,
   })

   const validatedFeatures = []
   for (let feature of props.features) {
      if (feature.length) {
         validatedFeatures.push(feature)
      }
   }
</script>

<template>
   <div
      v-if="validatedFeatures.length"
      class="mr-10 mt-5 pb-5"
   >
      <div
         class="flex text-lg mt-2"
         v-for="feature in validatedFeatures"
         :key="feature"
      >
         <p class="rounded text-lime-800 mr-3">✓</p>
         <p>{{ feature }}</p>
      </div>
   </div>
</template>
