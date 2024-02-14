<script setup>
   definePageMeta({
      layout: 'wide',
   })

   const route = useRoute()

   const PostStore = usePostStore()
   const UserStore = useUserStore()

   const config = useRuntimeConfig()

   const { toTitleCase } = useUtilities()

   // Get ID from route - check hyphenation (name may include extra -)
   const { name, id: routeId } = route.params

   const term = !name.includes('-')
      ? name + '-' + routeId
      : name + routeId

   const termArr = term.split('-')
   const plantId = termArr[termArr.length - 1]

   // Fetch plant data
   let post = PostStore.getPostByID(plantId)

   if (!post) {
      post = await PostStore.loadPost(plantId)

      if (!post) {
         throw createError({
            statusCode: '404',
            message: `Plant with ID of ${route.params.id} does not exist`,
         })
      }
   }

   // Fetch grower data
   let grower = UserStore.getGrowerByID(post.listerId)

   if (!grower) {
      grower = await UserStore.loadGrower(post.listerId)
   }

   const { commonName, image } = post
   const { user_name } = grower

   useSeoMeta({
      title: `${commonName} - growBook`,
      ogTitle: `${commonName} - growBook`,
      description: `${toTitleCase(
         user_name
      )}'s ${commonName}`,
      ogDescription: `${toTitleCase(
         user_name
      )}'s ${commonName}`,
      ogImage: `${config.public.supabase.url}/storage/v1/object/public/images/${image}`,
   })
</script>

<template>
   <div v-if="post">
      <PlantDetailHero :plant="post" />

      <div class="pb-3 border-b">
         <User
            :user="grower"
            imageSize="12"
            hideFullName
            hideDescription
         />
      </div>

      <PlantDetailAttributes
         :features="[
            post.source,
            post.nativeTo,
            post.indoor,
            post.ecotype,
         ]"
      />
      <PlantDetailDescription
         :description="post.description"
      />
      <PlantDetailContact />
   </div>
</template>
