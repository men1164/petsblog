<template>
    <router-link :to="{ name: 'Blogview', params: { blogId: blog.docId, petId: blog.petDocID } }" class="card flex flex-row items-center bg-white rounded-3xl w-full h-28 mb-7 shadow-lg">
        <div class="w-1/4 h-full">
            <img class="w-full h-full object-cover rounded-l-3xl" :src="blog.photoURL">
        </div>
        <div class="flex flex-col w-1/2 max-w-lg h-full p-3 ml-2">
            <p class="font-semibold text-2xl mb-2 truncate" v-if="pet">[{{ pet.petsName }}]: {{ blog.title }}</p>
            <p class="font-normal text-base">Owner: {{ blog.ownerName }}</p>
            <p class="font-normal text-base w-full truncate">{{ blog.body }}</p>
        </div>
        <div class="w-1/4 px-5">
            <p class="text-sm text-right text-gray-400">{{ formatDistanceToNow(blog.createAt.toDate(), { addSuffix: true }) }}</p>
        </div>
    </router-link>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import getPetDetail from '@/composables/getPetDetail'

export default {
    props: ['blog'],
    setup(props) {
        const { pet } = getPetDetail('petDetail', props.blog.petDocID)

        return { formatDistanceToNow, pet }
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