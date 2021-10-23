<template>
  <form @submit.prevent="handleLogin" class="max-w-400 mx-auto my-0 p-7 rounded-md shadow-lg border-solid bg-white">
    <h3>Log in</h3>
      <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="email" placeholder="Email" v-model="email">
      <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="password" placeholder="Password" v-model="password">
      <div class="error" v-if="error">{{ error }}</div>
      <button class="mt-5 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md" v-if="!isPending">Log in</button>
      <button class="mt-5 rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md" v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const { error, isPending, login } = useLogin()
    const email = ref('')
    const password = ref('')

    const handleLogin = async () => {
      const res = await login(email.value, password.value)
      if(!error.value) {
        console.log('Login Completed!')
        console.log(res.res.user)
      }
    }

    return { email, password, handleLogin, error, isPending }
  }
}
</script>