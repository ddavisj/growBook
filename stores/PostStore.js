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
         if (!this.posts.length) {
            const { data: posts } = await useFetch(
               '/api/plant/listings/get-latest'
            )
            this.posts = posts.value
         }
      },
   },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
