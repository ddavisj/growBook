<script setup>
   definePageMeta({
      layout: 'wide',
   })

   const route = useRoute()

   const { toTitleCase } = useUtilities()

   const PostStore = usePostStore()
   const UserStore = useUserStore()

   // Get ID from route - check hyphenation
   const { name, id: routeId } = route.params

   const term = !name.includes('-')
      ? name + '-' + routeId
      : name + routeId

   const split = term.split('-')
   const id = split[split.length - 1]

   // Fetch plant data

   // const plant = getAllLoadedPostByID(id)
   // if (!plant) {
   PostStore.loadPost(id)
   // }
   // const plant = await useFetchPlant(id)

   // let post
   // const waitForPost = async () => {
   const post = PostStore.getLoadedPostByID(id)
   // }

   console.log('A')
   console.log({ post })

   let grower
   if (post) {
      console.log(post.age)

      // UserStore.loadGrower(post.listerId)

      grower = UserStore.loadGrower(post.listerId)

      // UserStore.getLoadedGrowerByID(post.listerId)

      // console.log('grower', grower)

      const { data: loaded } = await useFetch(
         `/api/user/get-user-by-uuid/${post.listerId}`
      )

      console.log('loaded', loaded.value)
   }

   // if (!post) {
   //    throw createError({
   //       statusCode: '404',
   //       message: `Plant with ID of ${route.params.id} does not exist`,
   //    })
   // }

   const config = useRuntimeConfig()

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
