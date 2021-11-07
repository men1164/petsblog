<template>
  <div class="navbar py-4 px-2 bg-primary-green bg-opacity-75 shadow-lg sticky top-0 z-50">
    <nav class="flex items-center h-10 max-w-7xl mx-auto my-0 text-white">
      <router-link :to="{ name: 'HomeBlog' }">
        <p class="font-bold text-xl text-white">Navbar</p>
      </router-link>
      <div v-if="user" class="ml-14 font-medium">
        <router-link class="text-gray-300 transition duration-300 ease-in-out hover:text-white focus:text-white" :to="{ name: 'UserInfo' }">Profile</router-link>
        <router-link class="ml-8 text-gray-300 transition duration-300 ease-in-out hover:text-white focus:text-white" :to="{ name: 'FollowingBlog' }">Following</router-link>
        <!-- <router-link>Your Pet</router-link>
        <router-link>Following</router-link> -->
      </div>
      <div class="ml-auto font-normal text-base">
        <div v-if="user" class="flex flex-row items-center">
          <router-link :to="{ name: 'UserInfo' }">
            <p class="mr-5">{{ user.displayName }}</p>
          </router-link>
          <button class="rounded-xl text-black bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2" @click="handleLogout">Log out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { user } = getUser()
    const { error, logout, isPending } = useLogout()
    const router = useRouter()

    const handleLogout = async () => {
      const res = await logout()
      if(!error.value) {
        console.log('Logout completed')
        router.push({ name: 'Home' })
      }
    }

    return { handleLogout, user, isPending }
  }
}
</script>

<style scoped>
.navbar {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>