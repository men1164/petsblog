<template>
    <div class="bg-white max-w-lg h-auto rounded-2xl shadow-xl mx-auto my-0 p-12 flex flex-col justify-center items-center">
        <p class="font-bold text-4xl text-primary-green">Your Profile</p>
        <img class="w-56 h-56 mt-8 rounded-full object-cover" :src="user.photoURL">
        <div class="flex flex-row items-center mt-4 shadow-md bg-gray-200 rounded-full p-2 text-verified-green">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <p class="ml-1 text-sm">Veterinarian</p>
        </div>
        <p class="font-semibold mt-4 text-3xl">{{ user.displayName }}</p>
        <p class="font-medium mt-2">{{ user.email }}</p>
        <button class="mt-4 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleToggle" v-if="!toggleForm">Verify Veterinarian Account</button>
        <form v-if="toggleForm" class="flex flex-col justify-center items-center mt-4">
            <label>Upload Graduated Certificate from Veterinary Medicine</label>
            <input type="file">
        </form>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import { ref } from '@vue/reactivity'

export default {
    setup() {
        const { user } = getUser()
        const toggleForm = ref(false)

        const handleToggle = () => {
            toggleForm.value = !toggleForm.value
        }

        return { user, toggleForm, handleToggle }
    }
}
</script>