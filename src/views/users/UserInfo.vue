<template>
    <div class="bg-white max-w-4xl h-auto rounded-2xl shadow-xl block mx-auto my-0 pt-0 pb-20">
        <img class=" rounded-t-2xl w-full" :src="user.photoURL">
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