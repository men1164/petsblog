<template>
    <div class="bg-white max-w-lg h-auto rounded-2xl shadow-xl mx-auto my-0 p-12 flex flex-col justify-center items-center">
        <p class="font-bold text-4xl text-primary-green">Your Profile</p>
        <img class="w-56 h-56 mt-8 rounded-full object-cover" :src="user.photoURL">
        <p class="font-semibold mt-4 text-3xl">{{ user.displayName }}</p>
        <p class="font-medium mt-2">{{ user.email }}</p>
        <button class="mt-4 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleToggle" v-if="!toggleForm">Verify Veterinarian Account</button>
        <Verify v-if="toggleForm"/>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import Verify from '../../components/Verify.vue'
import { ref } from '@vue/reactivity'

export default {
    components: { Verify },
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