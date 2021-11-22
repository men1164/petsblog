<template>
    <div v-if="pet" class="flex flex-col h-full w-auto items-center mt-10">
        <div class="pet-profile bg-white bg-opacity-25 rounded-3xl w-1/3 h-full text-center p-6 shadow-xl mb-10">
            <img class="my-3 mx-auto object-cover w-40 h-40 rounded-full" :src="pet.photoURL">
            <form class="text-black my-3" v-if="isEdit">
                <input type="text" class="focus:outline-none" v-model="newPetsName">
            </form>
            <p class="font-semibold text-xl mb-2" v-else>{{ pet.petsName }}</p>
            <p class="text-base">Owner: {{ pet.ownerName }}</p>
            <p class="text-base">Gender: {{ pet.gender }}</p>
            <p class="text-base">Breed: {{ pet.breed }}</p>
            <p class="text-base">Followers: {{ pet.followers }}</p>
            <div v-if="isOwnership">
                <div v-if="!isEdit">
                    <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-primary-green mt-3" @click="toggleForm">Edit</button>
                    <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-red-500 mt-3 ml-3">Delete</button>
                </div>
                <div v-else>
                    <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-primary-green mt-3" @click="submitEdit">Submit</button>
                    <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-red-500 mt-3 ml-3" @click="toggleForm">Cancel</button>
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
import usePet from '@/composables/usePet'
import useUserDetail from '@/composables/useUserDetail'
import BlogCard from '@/components/BlogCard.vue'
import { computed, ref } from '@vue/reactivity'

export default {
    props: ['id'],
    components: { BlogCard },
    setup(props) {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: blogs } = getBlogs('petBlog', ['petDocID', '==', props.id])
        const { pet, error } = getPetDetail('petDetail', props.id)
        const { updatePetName, toggleFollow } = usePet('petDetail')
        const { followPet } = useUserDetail('userDetail')
        const isEdit = ref(false)
        const newPetsName = ref(null)

        const isOwnership = computed(() => {
            return pet.value && userDetail.value && pet.value.ownerDocID == userDetail.value.docId
        })

        const isFollowing = computed(() => {
            return userDetail.value && [...userDetail.value.followedPets].includes(props.id)
        })

        const toggleForm = () => {
            newPetsName.value = null
            isEdit.value = !isEdit.value
        }

        const submitEdit = async () => {
            const inputName = newPetsName.value[0].toUpperCase() + newPetsName.value.slice(1)
            await updatePetName(pet.value.docId, inputName)
            isEdit.value = false
        }

        const handleFollow = async () => {
            await followPet(userDetail.value.docId, props.id, 'follow')
            await toggleFollow(props.id, 'follow')
        }

        const handleUnfollow = async () => {
            await followPet(userDetail.value.docId, props.id, 'unfollow')
            await toggleFollow(props.id, 'unfollow')
        }

        return { pet, error, isOwnership, isEdit, toggleForm, newPetsName, submitEdit, blogs, handleFollow, handleUnfollow, isFollowing }
    }
}
</script>

<style scoped>
.pet-profile {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

</style>