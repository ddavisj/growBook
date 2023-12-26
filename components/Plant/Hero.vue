<template>
   <div
      class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('/leaves-bg.jpg')]"
   >
      <div
         class="z-10 absolute w-full h-full flex justify-center items-center"
      >
         <div class="text-center w-1/2">
            <h1
               class="text-8xl font-serif mb-10 text-white"
               style="text-shadow: 3px 3px black"
            >
               Grow and share plants
            </h1>
            <PlantSearchBar />
         </div>
      </div>
      <div
         class="z-1 absolute w-full h-full bg-black opacity-50"
      ></div>
   </div>
</template>
