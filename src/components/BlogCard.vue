<template>
    <div v-for="blog in blogs" :key="blog.docId" class="card flex flex-row items-center bg-white rounded-3xl w-full h-28 mb-7 shadow-lg">
        <div class="w-1/4 h-full">
            <img class="w-full h-full object-cover rounded-l-3xl" src="@/assets/demo-petcard.jpg">
        </div>
        <div class="flex flex-col max-w-lg h-full p-3 ml-2">
            <p class="font-semibold text-2xl mb-2 truncate">[{{ blog.petsName }}]: {{ blog.title }}</p>
            <p class="font-normal text-base">Owner: {{ blog.ownerName }}</p>
            <p class="font-normal text-base truncate">{{ blog.body }}</p>
        </div>
        <p class="text-sm mx-4 max-w-xs text-gray-400">{{ formatDistanceToNow(blog.createAt.toDate(), { addSuffix: true }) }}</p>
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
.card:hover {
    box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.03);
    transition: all ease 0.2s;
}
</style>