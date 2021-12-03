<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Your Pets</p>
        <div class="w-2/3 pt-5 text-center">
            <input class="h-10 w-1/2 bg-gray-200 focus:bg-gray-100 focus:outline-none rounded-lg p-5 shadow-lg" placeholder="Search pet's name" type="text" v-model="search">
        </div>
        <div class="flex justify-end w-2/3 mt-4 px-5" v-if="ownPets && !ownPets.length == 0">
            <router-link :to="{ name: 'CreatePet' }">
                <button class="flex items-center justify-center w-32 h-auto ml-auto mt-2 p-2 bg-gray-100 shadow-md rounded-md text-blue-400 transform hover:scale-110 transition-transform">
                    <svg class="h-5 w-5" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                    </svg>
                    <p class="ml-1">Create Pet</p>
                </button>
            </router-link>
        </div>
        <div class="flex flex-wrap justify-center w-2/3 mt-4 h-full">
            <PetCard v-if="ownPets && !search" :pets="ownPets" />
            <PetCard v-else-if="ownPets && search" :pets="ownPets" />
            <p v-if="ownPets && ownPets.length == 0 && !search" class="text-white mt-6">
                You don't have any pet. <router-link class="font-semibold underline" :to="{ name: 'CreatePet' }">Create one!</router-link>
            </p>
            <p v-else-if="ownPets && ownPets.length == 0 && search" class="text-white">Not found any pet's name match to '{{ search }}'</p>
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
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: pets } = getCollection('petDetail', 'pets')
        const search = ref('')

        const ownPets = computed(() => {
            let res
            if(pets.value && search.value) {
                res = pets.value.filter(pet => pet.ownerDocID == userDetail.value.docId && pet.petsName.toLowerCase().includes(search.value.toLowerCase()))
            }
            else if(pets.value && !search.value) {
                res = pets.value.filter(pet => pet.ownerDocID == userDetail.value.docId)
            }
            return res
        })

        return { search, ownPets }
    }
}
</script>