<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Following</p>
        <div class="w-2/3 pt-5 text-center">
            <input class="h-10 w-1/2 bg-gray-200 focus:bg-gray-100 focus:outline-none rounded-lg p-5 shadow-lg" placeholder="Search pet's name" type="text" v-model="search">
        </div>
        <div class="flex flex-wrap justify-center w-2/3 mt-10 h-full">
            <PetCard v-if="followingPets" :pets="followingPets" />
            <p v-if="followingPets && followingPets.length == 0 && !search" class="text-white">
                You are not following any pet. <router-link class="font-semibold underline" :to="{ name: 'Explore' }">Explore</router-link> them to find some!
            </p>
            <p v-else-if="followingPets && followingPets.length == 0 && search" class="text-white">Not found any pet's name match to '{{ search }}'</p>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import { computed, ref } from '@vue/reactivity'
import PetCard from '@/components/PetCard.vue'
import getCollection from '../../composables/getCollection'

export default {
    components: { PetCard },
    setup() {
        const { data: pets } = getCollection('petDetail', 'pets')
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const search = ref('')

        const followingPets = computed(() => {
            let res
            if(pets.value && userDetail.value) {
                if(search.value) {
                    res = pets.value.filter(pet => [...userDetail.value.followedPets].includes(pet.docId) && pet.petsName.toLowerCase().includes(search.value.toLowerCase()))
                }
                else {
                    res = pets.value.filter(pet => [...userDetail.value.followedPets].includes(pet.docId))
                }
            }
            return res
        })

        return { followingPets, search }
    }
}
</script>