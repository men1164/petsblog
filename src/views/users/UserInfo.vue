<template>
    <div class="bg-white max-w-4xl h-auto rounded-2xl shadow-xl block mx-auto my-0 p-20">
        <img :src="user.photoURL">
        <p>{{ user.displayName }}</p>
        <p>{{ user.email }}</p>
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

<style>

</style>