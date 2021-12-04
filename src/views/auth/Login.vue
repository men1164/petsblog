<template>
    <div class="max-w-400 mx-auto my-10 p-7 rounded-md shadow-lg border-solid bg-white">
        <form @submit.prevent="handleLogin" class="mb-4">
            <h3>Log in</h3>
            <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="email" placeholder="Email" v-model="email">
            <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="password" placeholder="Password" v-model="password">
            <div class="text-sm text-red-500" v-if="error">{{ error }}</div>
            <button class="mt-5 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md" v-if="!isPending">Log in</button>
            <button class="mt-5 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md" v-if="isPending" disabled>Loading</button>
        </form>
        <router-link :to="{ name: 'Signup' }" class="underline text-sm">Don't have an account?</router-link>
    </div>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, isPending, login } = useLogin()
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    /**
     * Handle logging in method.
     */
    const handleLogin = async () => {
      await login(email.value, password.value)
      if(!error.value) {
        router.push({ name: 'Explore' })
      }
    }

    return { email, password, handleLogin, error, isPending }
  }
}
</script>