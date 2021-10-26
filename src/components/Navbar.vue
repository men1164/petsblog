<template>
  <div class="navbar py-4 px-2 bg-primary-green bg-opacity-75 shadow-lg sticky top-0 z-50">
    <nav class="flex items-center h-10 max-w-7xl mx-auto my-0 text-white">
      <p class="font-bold text-xl text-white">Navbar</p>
      <div class="ml-14 font-medium">
        <router-link class="text-gray-100 transition duration-300 ease-in-out hover:text-white focus:text-white" :to="{ name: 'UserInfo' }">Profile</router-link>
        <!-- <router-link>Your Pet</router-link>
        <router-link>Following</router-link> -->
      </div>
      <div class="ml-auto font-normal text-base">
        <div v-if="user" class="flex flex-row items-center">
          <p class="mr-5">{{ user.displayName }}</p>
          <button class="rounded-xl text-black bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleLogout">Log out</button>
        </div>
        <!-- <div v-else>
          <router-link :to="{ name: 'Login' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2">Login</router-link>
          <router-link :to="{ name: 'Signup' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md">Signup</router-link>
        </div> -->
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

    return { handleLogout, user, isPending }
  }
}
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(6.7px);
  -webkit-backdrop-filter: blur(6.7px);
}
</style>