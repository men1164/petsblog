<template>
  <div class="navbar py-4 px-2 mb-14 bg-white">
    <nav class="flex items-center max-w-7xl mx-auto my-0">
      <p>Navbar</p>
      <div v-if="user" class="ml-auto">
        <p>Welcome! {{ user.displayName }}</p>
        <button class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleLogout">Log out</button>
      </div>
      <div v-else class="ml-auto">
        <router-link :to="{ name: 'Login' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2">Login</router-link>
        <router-link :to="{ name: 'Signup' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'

export default {
  setup() {
    const { user } = getUser()
    const { error, logout, isPending } = useLogout()

    const handleLogout = async () => {
      const res = await logout()
      if(!error.value) {
        console.log('Logout completed')
      }
    }

    return { handleLogout, user }
  }
}
</script>