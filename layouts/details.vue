<template>
   <NavBar />
   <div
      wide
      class="mx-auto mt-4 max-w-8 space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 md:w-4/5"
   >
      <slot />
   </div>
</template>

<!--
"wide" keep mobile settings
mx-auto mt-4 max-w-8 space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 md:w-4/5 md:w-3/5
KEEP THIS!


"custom" keep wide settings
mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-4/5
-->
