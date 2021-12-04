<template>
    <div v-if="!comments">
        <p class="py-7 font-regualr text-base text-gray-400">Be the first one to Comment!</p>
    </div>
    <div v-else v-for="comment in comments" :key="comment.docId" class="flex flex-col w-full h-auto py-4 border-dotted border-b-2 border-gray-300">
        <div class="flex items-center">
            <img :src="comment.photoURL" class="w-12 h-12 object-cover rounded-full">
            <div class="ml-4">
                <p class="font-semibold">{{ comment.username }}</p>
                <p class="text-sm text-gray-400">{{ formatDistanceToNow(comment.createAt.toDate(), { addSuffix: true }) }}</p>
            </div>
        </div>
        <p class="mt-3 py-3 px-4 bg-gray-100 max-w-max shadow-md rounded-2xl">{{ comment.body }}</p>
    </div>
    <form class="mt-5 flex items-center sticky bottom-0 bg-white pt-7 pb-4" @submit.prevent="handleSubmit">
        <input type="text" class="bg-gray-100 h-10 w-2/3 px-5 rounded-lg shadow focus:bg-gray-200 focus:shadow-lg text-black focus:outline-none" placeholder="What's on your mind..?" v-model="newComment" required>
        <button class="text-primary-green text-lg ml-4 font-medium bg-blue-400 w-10 h-10 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-transform" type="submit">
            <svg class="h-6 w-6 mx-auto my-0 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        </button>
    </form>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
import getUser from '@/composables/getUser'
import getCollection from '../composables/getCollection'
import useData from '@/composables/useData'
import { ref } from '@vue/reactivity'
import { serverTimestamp } from '@firebase/firestore'

export default {
    props: ['blogId'],
    setup(props){
        const { user } = getUser()
        const { error, create: addComment } = useData('comments')
        const newComment = ref('')
        const { data: comments } = getCollection('comments', 'comments', ['blogId', '==', props.blogId])
        
        /**
         * Handle submit and request to create new comment in the blog.
         */
        const handleSubmit = async () => {
            const commentDoc = {
                body: newComment.value,
                blogId: props.blogId,
                photoURL: user.value.photoURL,
                username: user.value.displayName,
                createAt: serverTimestamp()
            }
            await addComment(commentDoc)
            if(!error.value){
                newComment.value = ''
            }
        }
        return { formatDistanceToNow, newComment, handleSubmit, comments }
    }
}
</script>

<style>

</style>