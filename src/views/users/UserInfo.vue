<template>
    <div class="bg-white max-w-lg h-auto rounded-2xl shadow-xl mx-auto my-0 p-12 flex flex-col justify-center items-center">
        <p class="font-bold text-4xl text-primary-green">Your Profile</p>
        <img class="w-56 h-56 mt-8 rounded-full object-cover" :src="user.photoURL">
        <p class="font-semibold mt-4 text-3xl">{{ user.displayName }}</p>
        <p class="font-medium mt-2">{{ user.email }}</p>
        <form class="flex flex-col justify-center items-center mt-4">
            <label>Upload your Veterinary Medicine graduated certificate</label>
            <input type="file">
        </form>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'

export default {
    setup() {
        const { user } = getUser()

        return { user }
    }
}
</script>