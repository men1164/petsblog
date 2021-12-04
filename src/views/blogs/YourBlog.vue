<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Your Blogs</p>
        <div class="w-2/3 pt-5 text-center mb-10">
            <input class="h-10 w-1/2 bg-gray-200 focus:bg-gray-100 focus:outline-none rounded-lg p-5 shadow-lg" placeholder="Search blog by title..." type="text" v-model="search">
        </div>
        <div class="w-2/3" v-for="blog in isOwnBlogs" :key="blog.docId">
            <BlogCard :blog="blog" />
        </div>
        <div v-if="isOwnBlogs && isOwnBlogs.length == 0 && !search">
            <p class="text-white">You don't have any blog. Go to <router-link class="font-semibold underline" :to="{ name: 'YourPet' }">your pet</router-link> to post some blog!</p>
        </div>
        <div v-else-if="isOwnBlogs && isOwnBlogs.length == 0 && search">
            <p class="text-white">Not found any blog's title match to '{{ search }}'</p>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import BlogCard from '@/components/BlogCard.vue'
import { computed, ref } from '@vue/reactivity'
import getCollection from '../../composables/getCollection'

export default {
    components: { BlogCard },
    setup() {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: blogs } = getCollection('petBlog', 'blogs')
        const search = ref('')

        /**
         * Use to computed all blogs and filter only user's own blog,
         * also filter with search value if needed.
         */
        const isOwnBlogs = computed(() => {
            let res
            if(blogs.value && userDetail.value) {
                if(search.value) {
                    res = blogs.value.filter(blog => [...userDetail.value.ownPetsID].includes(blog.petDocID) && blog.title.toLowerCase().includes(search.value.toLowerCase()))
                }
                else {
                    res = blogs.value.filter(blog => [...userDetail.value.ownPetsID].includes(blog.petDocID))
                }
            }
            return res
        })

        return { isOwnBlogs, search }
    }
}
</script>

<style>

</style>