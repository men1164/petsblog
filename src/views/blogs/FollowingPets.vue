<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Following</p>
        <div class="border-b-2 border-white w-2/3 pt-5"></div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import getPetsOrBlogs from '@/composables/getPetsOrBlogs'
import { computed } from '@vue/reactivity'

export default {
    setup() {
        const { data: pets } = getPetsOrBlogs('petDetail')
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)

        // const followingPets = computed(() => {
        //     return 
        // })
    }
}
</script>