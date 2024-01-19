export const usePostStore = defineStore('PostStore', {
   state: () => {
      return {
         posts: [],
      }
   },
   getters: {},
   actions: {
      addRecentPost(post) {
         this.posts.unshift(post)
      },
      async loadLatestPosts() {
         if (this.posts.length <= 1) {
            // ie. if just one or no posts loaded (user adds before visiting home page)
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.posts = posts.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(
      acceptHMRUpdate(usePostStore, import.meta.hot)
   )
}
