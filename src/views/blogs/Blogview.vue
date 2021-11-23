<template>
    <div v-if="blog && pet" class="mx-auto flex flex-col jusify-center items-center relative h-full">
        <img class="w-full object-cover h-96" :src="pet.photoURL">
        <div class="absolute flex flex-row top-80 bg-white min-w-1/2 max-w-max p-4 rounded-2xl h-24 max-h-32 shadow-lg">
            <div class="flex flex-col w-full h-full">
                <p class="w-full font-bold text-2xl mx-2">{{ blog.title }}</p>
                <p class="mt-10 mx-2 absolute font-medium text-md text-gray-800">
                    <router-link class="font-bold hover:underline hover:text-black" :to="{ name: 'LandingPet', params: { id: pet.docId } }">{{ pet.petsName }}</router-link> - Breed: {{ pet.breed }} | Gender: {{ pet.gender }} | Age: {{ pet.age }} year(s) old
                </p>
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-16 flex items-center justify-start mx-32"> 
                <div class="mx-0 flex items-end justify-between w-full">
                    <div class="flex items-end">
                        <p class="font-semibold text-lg">Written by: {{ pet.ownerName }}</p>
                        <p v-if="blog && blog.createAt" class="text-sm ml-4 text-gray-400 pb-0.5">{{ formatDistanceToNow(blog.createAt.toDate(), { addSuffix: true }) }}</p>
                    </div>
                    <div v-if="isOwner">
                        <div class="flex items-center justify-center">
                            <button type="button" @click="openModal" class="p-2 rounded-lg shadow-md max-w-max h-10 border border-gray-100 hover:border-transparent hover:shadow-lg bg-white flex items-center text-red-500 hover:bg-gray-200">
                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <p class="ml-1">Delete</p>
                            </button>
                        </div>
                        <TransitionRoot appear :show="isOpen" as="template">
                            <Dialog as="div" @close="closeModal">
                                <div class="fixed inset-0 z-10 overflow-y-auto">
                                    <div class="min-h-screen px-4 text-center">
                                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                                        <DialogOverlay class="fixed inset-0" />
                                    </TransitionChild>

                                    <span class="inline-block h-screen align-middle" aria-hidden="true">
                                        &#8203;
                                    </span>

                                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                        <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                                Do you want to delete this blog?
                                            </DialogTitle>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">You cannot undo your action.</p>
                                            </div>

                                            <div class="mt-4">
                                                <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="closeModal">
                                                    Cancel
                                                </button>
                                                <button type="button" class="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500" @click="handleDelete">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </TransitionChild>
                                    </div>
                                </div>
                            </Dialog>
                        </TransitionRoot>
                    </div>
                </div>
            </div>
            <div v-if="blog && blog.body" class="flex flex-col mt-5 mx-auto w-3/4">
                <p class="w-full h-full" v-for="(paragraph, idx) in blog.body.split('\n')" :key="idx">&emsp;&emsp;{{ paragraph }}<br></p>
                <img class="w-2/3 h-auto mx-auto my-10 shadow-lg rounded-2xl" :src="blog.photoURL">
            </div>
            <!-- if unlike state -->
            <div v-if="!isLiked" class="mx-auto w-2/3 mb-5 flex items-center">
                <svg @click="handleLike" class="h-9 w-9 text-gray-300 hover:text-blue-300 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p class="ml-1">{{ blog.likes }}</p>
            </div>
            <!-- if liked state -->
            <div v-else class="mx-auto w-2/3 mb-5 flex items-center">
                <svg @click="handleUnlike" class="h-9 w-9 text-blue-500 hover:text-blue-300 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                <p class="ml-1">{{ blog.likes }}</p>
            </div>
            <!-- ! Comment Component -->
            <div class="mx-auto mb-10 h-500 overflow-y-auto w-2/3">
                <div class="sticky top-0">
                    <p class="font-bold text-2xl bg-white">Comments</p>
                    <div class="border-b-2 border-gray-300"></div>
                </div>
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
import usePetOrBlog from '@/composables/usePetOrBlog'
import useUserDetail from '@/composables/useUserDetail'
import useStorage from '@/composables/useStorage'
import { computed, ref } from '@vue/reactivity'
import { formatDistanceToNow } from 'date-fns'
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'
import { useRouter } from 'vue-router'

export default {
    components: { 
        Comment, 
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle
    },
    props: ['blogId', 'petId'],
    setup(props) {
        const { blog } = getBlogDetail('petBlog', props.blogId)
        const { pet } = getPetDetail('petDetail', props.petId)
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { error, toggleLike, deleteDocument: deleteBlog } = usePetOrBlog('petBlog')
        const { deleteImage } = useStorage()
        const { likedBlogsAction } = useUserDetail('userDetail')
        const isOpen = ref(false)
        const router = useRouter()
        
        const isLiked = computed(() => {
            return userDetail.value && [...userDetail.value.likedBlogs].includes(props.blogId)
        })

        const isOwner = computed(() => {
            return userDetail.value && [...userDetail.value.ownPetsID].includes(blog.value.petDocID)
        })

        const handleLike = async () => {
            await likedBlogsAction(userDetail.value.docId, props.blogId, 'like')
            await toggleLike(props.blogId, 'like')
        }

        const handleUnlike = async () => {
            await likedBlogsAction(userDetail.value.docId, props.blogId, 'unlike')
            await toggleLike(props.blogId, 'unlike')
        }

        const handleDelete = async () => {
            await deleteImage(blog.value.filePath)
            await deleteBlog(blog.value.docId)
            isOpen.value = false
            router.push({ name: "LandingPet", params: { id: pet.value.docId } })
        }

        const closeModal = () => {
            isOpen.value = false
        }
        
        const openModal = () => {
            isOpen.value = true
        }

        return { blog, pet, handleLike, handleUnlike, isLiked, formatDistanceToNow, isOwner, isOpen, closeModal, openModal, handleDelete }
    }
}
</script>