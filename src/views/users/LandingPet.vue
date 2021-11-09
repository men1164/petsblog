<template>
    <div v-if="pet" class="flex flex-col h-full w-auto items-center">
        <div class="pet-profile bg-white bg-opacity-25 rounded-3xl w-1/3 h-full text-center p-6 shadow-xl mb-10">
            <img class="my-3 mx-auto object-cover w-40 h-40 rounded-full" :src="pet.photoURL">
            <form class="text-black my-3" v-if="isEdit">
                <input type="text" class="focus:outline-none" v-model="newPetsName">
            </form>
            <p class="font-semibold text-xl mb-2" v-else>{{ pet.petsName }}</p>
            <p class="text-base">Owner: {{ pet.ownerName }}</p>
            <p class="text-base">Gender: {{ pet.gender }}</p>
            <p class="text-base">Breed: {{ pet.breed }}</p>
            <div v-if="isOwnership && !isEdit">
                <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-primary-green mt-3" @click="toggleForm">Edit</button>
                <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-red-500 mt-3 ml-3">Delete</button>
            </div>
            <div v-if="isOwnership && isEdit">
                <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-primary-green mt-3" @click="submitEdit">Submit</button>
                <button class="rounded-xl bg-gray-200 hover:bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3 shadow-md text-red-500 mt-3 ml-3" @click="toggleForm">Cancel</button>
            </div>
        </div>
        <div class="w-2/3 h-full">
            <div class="w-full flex flex-col">
                <p class="font-semibold text-lg text-white border-b-2">Blogs from {{ pet.petsName }} !</p>
                <router-link :to="{ name: 'CreateBlog', params: { id: pet.docId } }">
                    <button v-if="isOwnership" class="flex items-center w-28 h-auto ml-auto mt-2 p-2 bg-gray-100 shadow-md rounded-md text-blue-400 transform hover:scale-110 transition-transform">
                        <svg class="h-5 w-5" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                        <p class="ml-1">New Blog</p>
                    </button>
                </router-link>
            </div>
            <div class="my-4">
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
            </div>
        </div>
    </div>
</template>

<script>
import getPetDetail from '@/composables/getPetDetail'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import usePet from '@/composables/usePet'
import BlogCard from '@/components/BlogCard.vue'
import { computed, ref } from '@vue/reactivity'

export default {
    props: ['id'],
    components: { BlogCard },
    setup(props) {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { pet, error } = getPetDetail('petDetail', props.id)
        const { updatePetName } = usePet('petDetail')
        const isEdit = ref(false)
        const newPetsName = ref(null)

        const isOwnership = computed(() => {
            return pet.value && userDetail.value && pet.value.ownerDocID == userDetail.value.docId
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

        return { pet, error, isOwnership, isEdit, toggleForm, newPetsName, submitEdit }
    }
}
</script>

<style scoped>
.pet-profile {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

</style>