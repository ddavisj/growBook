<script setup>
   definePageMeta({
      layout: 'wide',
   })

   const route = useRoute()

   const PostStore = usePostStore()
   const UserStore = useUserStore()

   const config = useRuntimeConfig()

   // const { toTitleCase } = useUtilities()

   // Get ID from route - check hyphenation (name may include extra -)
   const { name, id: routeId } = route.params

   const term = !name.includes('-')
      ? name + '-' + routeId
      : name + routeId

   const termArr = term.split('-')
   const plantId = termArr[termArr.length - 1]

   // Fetch plant data

   // PostStore.loadPost(plantId, true) // Just commented

   let post = PostStore.getLoadedPostByID(plantId) // Just commented

   if (!post) {
      await PostStore.loadPost(plantId)
      post = PostStore.getLoadedPostByID(plantId)
   }

   console.log('--A--')
   console.log(post.commonName)
   console.log({ post })

   // let grower
   // if (post) {
   //    console.log('age', post.age)

   //    // UserStore.loadGrower(post.listerId)

   //    grower = UserStore.loadGrower(post.listerId)

   //    // UserStore.getLoadedGrowerByID(post.listerId)

   //    console.log('grower', grower)

   //    const { data: loaded } = await useFetch(
   //       `/api/user/get-user-by-uuid/${post.listerId}`
   //    )

   //    console.log('loaded', loaded.value)
   // }

   // if (!post) {
   //    throw createError({
   //       statusCode: '404',
   //       message: `Plant with ID of ${route.params.id} does not exist`,
   //    })
   // }

   // useSeoMeta({
   //    title: `${post.value.commonName} - growBook`,
   //    ogTitle: `${post.value.commonName} - growBook`,
   //    description: `${toTitleCase(
   //       user.value.user_name
   //    )}'s ${post.value.commonName}`,
   //    ogDescription: `${toTitleCase(
   //       user.value.user_name
   //    )}'s ${post.value.commonName}`,
   //    ogImage: `${config.public.supabase.url}/storage/v1/object/public/images/${post.value.image}`,
   // })
</script>

<template>
   <!-- <div v-if="post">
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
   </div> -->
</template>
