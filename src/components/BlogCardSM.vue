<template>
    <div v-for="blog in blogs" :key="blog.docId" class="card-sm bg-white shadow-lg rounded-3xl min-w-cardWidth-sm max-w-cardWidth-sm min-h-cardHeight-sm max-h-cardHeight-sm mr-7">
        <router-link :to="{ name: 'VBlogview', params: { blogId: blog.docId } }">
            <div class="flex flex-row h-full w-full">
                <div class="h-full w-1/3">
                    <img class="h-full w-full object-cover rounded-l-3xl" :src="blog.photoURL">
                </div>
                <div class="h-full w-2/3 text-left p-3 relative">
                    <p class="font-medium text-lg truncate mb-2">{{ blog.title }}</p>
                    <p class="text-sm mb-1">By: Dr. {{ blog.username }}</p>
                    <p class="text-sm text-gray-500">{{ formatDistanceToNow(blog.createAt.toDate(), { addSuffix: true }) }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'

export default {
    props: ['blogs'],
    setup() {
        return { formatDistanceToNow }
    }
}
</script>

<style scoped>
.card-sm:hover {
    box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.03);
    transition: all ease 0.2s;
}
</style>