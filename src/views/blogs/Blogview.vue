<template>
    <div v-if="blog && pet" class="mx-auto flex flex-col jusify-center items-center relative h-full">
        <p class="font-bold text-4xl text-white">You're reading the blog from {{ pet.petsName }} !</p>
        <img class="mt-2 w-full object-cover h-80" :src="pet.photoURL">
        <div class="absolute flex flex-row top-80 bg-white min-w-1/2 max-w-max p-4 rounded-2xl h-24 max-h-32 shadow-lg">
            <div class="flex flex-col w-full h-full">
                <p class="w-full font-bold text-2xl mx-2">{{ blog.title }}</p>
                <p class="mt-10 mx-2 absolute font-medium text-md">Breed: {{ pet.breed }} | Gender: {{ pet.gender }} | Age: {{ pet.age }} year(s) old</p>
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-16 mx-4 flex items-center"> 
                <!-- <img v-if="userDetail" class="profile w-16 h-16 rounded-full shadow-lg object-cover" :src="userDetail.photoURL"> -->
                <div class="ml-12">
                    <p class="font-semibold text-lg">Written by: {{ pet.ownerName }}</p>
                </div>
            </div>
            <div class="flex flex-col mt-5 mx-16">
                <p class="w-full h-full" v-for="paragraph in blog.body.split('\n')" :key="paragraph">&emsp;&emsp;{{ paragraph }}<br></p>
                <img class="w-2/3 h-auto mx-auto my-10 shadow-lg rounded-2xl" :src="blog.photoURL">
            </div>
            <!-- if unlike state -->
            <div v-if="!isLiked" class="mx-16 mb-5 flex items-center">
                <svg @click="handleLike" class="h-9 w-9 text-gray-300 hover:text-blue-300 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p class="ml-1">{{ blog.likes }}</p>
            </div>
            <!-- if liked state -->
            <div v-else class="mx-16 mb-5 flex items-center">
                <svg @click="handleUnlike" class="h-9 w-9 text-blue-500 hover:text-blue-300 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p class="ml-1">{{ blog.likes }}</p>
            </div>
            <!-- ! Comment Component -->
            <div class="mx-16">
                <p class="font-bold text-2xl">Comments</p>
                <div class="border-b-2 border-gray-300"></div>
                <Comment :blogId="blogId" />
            </div>
        </div>
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
import getPetDetail from '@/composables/getPetDetail'
import getBlogDetail from '@/composables/getBlogDetail'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import usePet from '@/composables/usePet'
import useUserDetail from '@/composables/useUserDetail'
import { computed } from '@vue/reactivity'

export default {
    components: { Comment },
    props: ['blogId', 'petId'],
    setup(props) {
        const { blog } = getBlogDetail('petBlog', props.blogId)
        const { pet } = getPetDetail('petDetail', props.petId)
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { error, toggleLike } = usePet('petBlog')
        const { likedBlogsAction } = useUserDetail('userDetail')
        
        const isLiked = computed(() => {
            let res = false
            let i
            
            if(userDetail.value) {
                for(i=0; i < userDetail.value.likedBlogs.length; i++) {
                    if(userDetail.value.likedBlogs[i] === props.blogId) {
                        res = true
                        break
                    }
                }
            }
            return res
        })

        const handleLike = async () => {
            await toggleLike(props.blogId, 'like')
            await likedBlogsAction(userDetail.value.docId, props.blogId, 'like')
        }

        const handleUnlike = async () => {
            await toggleLike(props.blogId, 'unlike')
            await likedBlogsAction(userDetail.value.docId, props.blogId, 'unlike')
        }

        return { blog, pet, handleLike, handleUnlike, isLiked }
    }
}
</script>