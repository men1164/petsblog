<template>
    <div class="bg-white max-w-lg h-auto rounded-2xl shadow-xl mx-auto my-8 p-12 flex flex-col justify-center items-center">
        <p class="font-bold text-4xl text-primary-green">Your Profile</p>
        <img class="w-56 h-56 mt-8 rounded-full object-cover" :src="user.photoURL">
        <div v-if="userDetail && userDetail.isVeterinarian" class="flex items-center mt-4">
            <div class="flex flex-row items-center shadow-md bg-gray-100 rounded-full p-2 text-verified-green">
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <p class="ml-1 text-sm">Veterinarian</p>
            </div>
            <div>
                <router-link :to="{ name: 'VCreateBlog' }">
                    <button class="flex items-center text-sm ml-2 p-2 bg-gray-100 shadow-md rounded-full text-blue-400 transform hover:scale-110 transition-transform">
                        <svg class="h-5 w-5" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                        </svg>
                        <p class="ml-1">New Blog</p>
                    </button>
                </router-link>
            </div>
        </div>
        <p class="font-semibold mt-4 text-3xl">{{ user.displayName }}</p>
        <p class="font-medium mt-2">{{ user.email }}</p>
        <div v-if="userDetail && !userDetail.isVeterinarian">
            <button class="mt-4 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleToggle" v-if="!toggleForm">Verify Veterinarian Account</button>
            <form v-if="toggleForm" @submit.prevent="handleVerify" class="flex flex-col justify-center items-center mt-4">
                <label>Upload Graduated Certificate from Veterinary Medicine</label>
                <button class="m-2 bg-gray-100 p-2 rounded-md shadow-lg border border-gray-300">Mockup Upload</button>
            </form>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import useUserDetail from '@/composables/useUserDetail'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { user } = getUser()
        const { error, userVerify } = useUserDetail('userDetail')
        const toggleForm = ref(false)
        const router = useRouter()

        const { userDetail } = getUserDetail('userDetail', user.value.uid)

        /* Handle toggle form to verify veterinarian */
        const handleToggle = () => {
            toggleForm.value = !toggleForm.value
        }

        /* Handle request to verify veterinarian */
        const handleVerify = async () => {
            await userVerify(userDetail.value.docId)
            if(!error.value) {
                router.push({ name: 'UserInfo' })
            }
        }

        return { user, toggleForm, handleToggle, handleVerify, userDetail }
    }
}
</script>