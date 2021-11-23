<template>
    <div v-if="pet" class="flex flex-col h-full w-auto items-center mt-10">
        <div class="pet-profile bg-white bg-opacity-25 rounded-3xl w-1/3 h-full text-center p-6 shadow-xl mb-10">
            <img class="my-3 mx-auto object-cover w-40 h-40 rounded-full" :src="pet.photoURL">
            <form class="text-black my-3" v-if="isEdit">
                <input type="text" class="focus:outline-none" v-model="newPetsName">
                <p class="text-white text-sm mt-2" v-if="editError">{{ editError }}</p>
            </form>
            <p class="font-semibold text-xl mb-2" v-else>{{ pet.petsName }}</p>
            <p class="text-base">Owner: {{ pet.ownerName }}</p>
            <p class="text-base">Gender: {{ pet.gender }}</p>
            <p class="text-base">Breed: {{ pet.breed }}</p>
            <p class="text-base">Followers: {{ pet.followers }}</p>
            <div v-if="isOwnership">
                <div v-if="!isEdit" class="flex justify-center items-center mt-3">
                    <button class="p-2 rounded-lg shadow-md max-w-max h-10 border border-gray-100 hover:border-transparent hover:shadow-lg bg-white flex items-center hover:bg-gray-200 text-primary-green" @click="toggleForm">
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <p class="ml-1">Edit</p>
                    </button>
                    <div class="flex items-center justify-center ml-3">
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
                                            Do you want to delete this pet?
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">All blogs that you created on this pet will be deleted. You cannot undo your action.</p>
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
                <div v-else>
                    <button class="inline-block p-2 rounded-lg shadow-md max-w-max h-10 border border-gray-100 hover:border-transparent hover:shadow-lg bg-white hover:bg-gray-200 text-primary-green mt-3" @click="submitEdit">Submit</button>
                    <button class="inline-block p-2 rounded-lg shadow-md max-w-max h-10 border border-gray-100 hover:border-transparent hover:shadow-lg bg-white hover:bg-gray-200 text-red-500 mt-3 ml-3" @click="toggleForm">Cancel</button>
                </div>
            </div>
            <div v-else>
                <div v-if="!isFollowing" @click="handleFollow" class="w-24 h-10 p-2 text-gray-500 bg-gray-200 hover:bg-gray-300 cursor-pointer mx-auto mt-4 rounded-lg shadow-lg">
                    <p>Follow</p>
                </div>
                <div v-else @click="handleUnfollow" class="max-w-max flex h-10 p-2 text-white bg-blue-400 hover:bg-blue-300 cursor-pointer mx-auto mt-4 rounded-lg shadow-inner">
                    <svg class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p>Following</p>
                </div>
            </div>
        </div>
        <div class="w-2/3 h-full">
            <div class="w-full flex flex-row justify-between items-end">
                <p class="font-semibold text-lg text-white">Blogs from {{ pet.petsName }} !</p>
                <router-link :to="{ name: 'CreateBlog', params: { id: pet.docId } }">
                    <button v-if="isOwnership" class="flex items-center w-28 h-auto ml-auto mt-2 p-2 bg-gray-100 shadow-md rounded-md text-blue-400 transform hover:scale-110 transition-transform">
                        <svg class="h-5 w-5" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                        <p class="ml-1">New Blog</p>
                    </button>
                </router-link>
            </div>
            <div class="border-b-2 mt-2"></div>
            <div v-if="!blogs" class="mx-auto text-center font-semibold text-white my-10">
                <p>Let's create the first blog for {{ pet.petsName }}!</p>
            </div>
            <div v-else class="my-4 mb-16">        
                <div v-for="blog in blogs" :key="blog.docId">
                    <BlogCard :blog="blog" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getPetDetail from '@/composables/getPetDetail'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import getBlogs from '@/composables/getBlogs'
import usePetOrBlog from '@/composables/usePetOrBlog'
import useUserDetail from '@/composables/useUserDetail'
import useStorage from '@/composables/useStorage'
import BlogCard from '@/components/BlogCard.vue'
import { computed, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from '@headlessui/vue'

export default {
    props: ['id'],
    components: { 
        BlogCard,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogOverlay,
        DialogTitle
    },
    setup(props) {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: blogs } = getBlogs('petBlog', ['petDocID', '==', props.id])
        const { pet, error } = getPetDetail('petDetail', props.id)
        const { updatePetName, toggleFollow, deleteDocument: deletePet } = usePetOrBlog('petDetail')
        const { deleteDocument: deleteBlog } = usePetOrBlog('petBlog')
        const { followPet, removePet } = useUserDetail('userDetail')
        const { deleteImage } = useStorage()
        const isEdit = ref(false)
        const newPetsName = ref(null)
        const editError = ref(null)
        const router = useRouter()
        const isOpen = ref(false)

        const isOwnership = computed(() => {
            return pet.value && userDetail.value && pet.value.ownerDocID == userDetail.value.docId
        })

        const isFollowing = computed(() => {
            return userDetail.value && [...userDetail.value.followedPets].includes(props.id)
        })

        const toggleForm = () => {
            newPetsName.value = null
            editError.value = null
            isEdit.value = !isEdit.value
        }

        const submitEdit = async () => {
            let inputName
            editError.value = null
            if(newPetsName.value) {
                inputName = newPetsName.value[0].toUpperCase() + newPetsName.value.slice(1)
                await updatePetName(pet.value.docId, inputName)
                isEdit.value = false
            }
            else {
                editError.value = 'Please enter the new name!'
            }
        }

        const handleFollow = async () => {
            await followPet(userDetail.value.docId, props.id, 'follow')
            await toggleFollow(props.id, 'follow')
        }

        const handleUnfollow = async () => {
            await followPet(userDetail.value.docId, props.id, 'unfollow')
            await toggleFollow(props.id, 'unfollow')
        }

        const handleDelete = async () => {
            if(blogs.value) {
                let blog
                const allBlogs = [...blogs.value]
                for (blog of allBlogs) {
                    await deleteImage(blog.filePath)
                    await deleteBlog(blog.docId)
                }
            }
            await deleteImage(pet.value.filePath)
            await removePet(userDetail.value.docId, props.id)
            await deletePet(props.id)
            router.push({ name: 'YourPet' })
        }

        const closeModal = () => {
            isOpen.value = false
        }
        
        const openModal = () => {
            isOpen.value = true
        }

        return { pet, error, isOwnership, isEdit, toggleForm, newPetsName, editError, submitEdit, blogs, handleFollow, handleUnfollow, isFollowing, handleDelete, isOpen, closeModal, openModal }
    }
}
</script>

<style scoped>
.pet-profile {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

</style>