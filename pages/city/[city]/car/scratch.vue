<template>
   <CarCards v-if="cars && cars.length" :cars="cars" />
   <h1 v-else class="text-red-600">
      No cars found with these filters
   </h1>
</template>
