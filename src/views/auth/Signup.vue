<template>
    <form @submit.prevent="handleSignup" class="max-w-400 mx-auto my-0 p-7 rounded-md shadow-lg border-solid bg-white">
        <h3>Sign up</h3>
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="text" placeholder="Display Name" v-model="displayName">
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="email" placeholder="Email" v-model="email">
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="password" placeholder="Password" v-model="password">
        <div class="error" v-if="error">{{ error }}</div>
        <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="!isPending">Sign up</button>
        <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const router = useRouter()

        const { error, signup, isPending } = useSignup()

        const handleSignup = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value) {
                console.log('SignUp Success')
                // router.push({ name: 'UserPlaylists' })
            }
        }

        return { email, password, displayName, isPending, error, handleSignup }
    }
}
</script>