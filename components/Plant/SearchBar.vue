<script setup>
   const city = ref('')
   const cityError = ref(false)
   const handleSearch = () => {
      if (!city.value) {
         return (cityError.value = true)
      }
      navigateTo(`/city/${city.value}/car`)
   }
</script>

<template>
   <div
      class="flex flex-col md:flex-row font-serif text-2xl md:rounded-full justify-between overflow-hidden drop-shadow-2xl mx-auto"
   >
      <input
         type="text"
         class="py-2 md:py-3 px-5 w-full md:text-2xl rounded-md md:rounded-full focus:outline-none"
         :class="cityError ? 'border-red-500 border' : ''"
         placeholder="Search by city..."
         v-model="city"
      />
      <button
         class="py-2 bg-sky-500 mt-4 md:mt-0 px-6 text-white rounded-md md:rounded-full"
         @click="handleSearch"
      >
         Search
      </button>
   </div>
</template>
