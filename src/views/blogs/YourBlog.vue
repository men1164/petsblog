<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Your Blogs</p>
        <div class="w-2/3 pt-5 text-center mb-10">
            <input class="h-10 w-1/2 bg-gray-200 focus:bg-gray-100 focus:outline-none rounded-lg p-5 shadow-lg" placeholder="Search pet's name" type="text" v-model="search">
        </div>
        <div class="w-2/3" v-for="blog in isOwnBlogs" :key="blog.docId">
            <BlogCard :blog="blog" />
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import getBlogs from '@/composables/getBlogs'
import BlogCard from '@/components/BlogCard.vue'
import { computed, ref } from '@vue/reactivity'

export default {
    components: { BlogCard },
    setup() {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: blogs } = getBlogs('petBlog')
        const search = ref('')

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