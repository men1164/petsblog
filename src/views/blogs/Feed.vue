<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl mb-3">Feed</p>
        <p class="font-semibold text-white mb-10">See the newest blog from the pets you're following!</p>
        <div class="w-2/3" v-for="blog in followingBlogs" :key="blog.docId">
            <BlogCard :blog="blog" />
        </div>
        <div v-if="followingBlogs && followingBlogs.length == 0">
            <p class="text-white">You are not following any pet. <router-link class="font-semibold underline" :to="{ name: 'Explore' }">Explore</router-link> them to find some!</p>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import BlogCard from '@/components/BlogCard.vue'
import { computed } from '@vue/reactivity'
import getCollection from '../../composables/getCollection'

export default {
    components: { BlogCard },
    setup() {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: blogs } = getCollection('petBlog', 'blogs')

        const followingBlogs = computed(() => {
            let res
            if(blogs.value && userDetail.value) {
                res = blogs.value.filter(blog => [...userDetail.value.followedPets].includes(blog.petDocID))
            }
            return res
        })

        return { followingBlogs }
    }
}
</script>

<style>

</style>