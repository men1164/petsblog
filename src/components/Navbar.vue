<template>
    <div class="navbar py-4 px-2 bg-primary-green bg-opacity-75 shadow-xl sticky top-0 z-50">
        <nav class="flex items-center h-10 min-w-min px-8 mx-auto my-0 text-white">
            <div class="flex items-center">
                <img class="w-9 h-9 mr-2" src="@/assets/logo.png">
                <p class="font-bold text-xl text-white">Pets Blog</p>
            </div>
            <div v-if="user" class="ml-11 font-medium">
                <router-link class="text-gray-300 transition duration-200 ease-in-out hover:text-white focus:text-white" :to="{ name: 'Explore' }">Explore</router-link>
                <router-link class="text-gray-300 transition duration-200 ease-in-out hover:text-white focus:text-white ml-9" :to="{ name: 'Feed' }">Feed</router-link>
                <router-link class="text-gray-300 transition duration-200 ease-in-out hover:text-white focus:text-white ml-9" :to="{ name: 'FollowingPets' }">Following</router-link>
                <router-link class="text-gray-300 transition duration-200 ease-in-out hover:text-white focus:text-white ml-9" :to="{ name: 'YourBlog' }">Your Blog</router-link>
                <router-link class="text-gray-300 transition duration-200 ease-in-out hover:text-white focus:text-white ml-9" :to="{ name: 'YourPet' }">Your Pet</router-link>
            </div>
            <div class="ml-auto font-normal text-base">
                <div v-if="user" class="flex flex-row items-center">
                    <router-link :to="{ name: 'UserInfo' }">
                        <p class="mr-5 font-semibold hover:underline">{{ user.displayName }}</p>
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

    /**
     * Handle sending request to logging out
     */
    const handleLogout = async () => {
      await logout()
      if(!error.value) {
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