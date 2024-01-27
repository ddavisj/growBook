<script setup>
   definePageMeta({
      layout: 'wide',
   })

   const route = useRoute()

   const { toTitleCase } = useUtilities()

   const PostStore = usePostStore()

   // Get ID from route - check hyphenation
   const { name, id: routeId } = route.params

   const term = !name.includes('-')
      ? name + '-' + routeId
      : name + routeId

   const split = term.split('-')
   const id = split[split.length - 1]

   // Fetch plant data

   const plant = getAllLoadedPostByID(id)
   if (!plant) {
      PostStore.loadPost(id)
   }
   // const plant = await useFetchPlant(id)

   if (!plant.value) {
      throw createError({
         statusCode: '404',
         message: `Plant with ID of ${route.params.id} does not exist`,
      })
   }

   const { data: user } = await useFetch(
      `/api/user/get-user-by-uuid/${plant.value.listerId}`
   )

   const config = useRuntimeConfig()

   useSeoMeta({
      title: `${plant.value.commonName} - growBook`,
      ogTitle: `${plant.value.commonName} - growBook`,
      description: `${toTitleCase(
         user.value.user_name
      )}'s ${plant.value.commonName}`,
      ogDescription: `${toTitleCase(
         user.value.user_name
      )}'s ${plant.value.commonName}`,
      ogImage: `${config.public.supabase.url}/storage/v1/object/public/images/${plant.value.image}`,
   })
</script>

<template>
   <div v-if="plant">
      <PlantDetailHero :plant="plant" />
      <div class="pb-3 border-b">
         <User
            :user="user"
            imageSize="12"
            hideFullName
            hideDescription
         />
      </div>
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
