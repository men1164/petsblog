<template>
    <div class="flex flex-col h-full w-auto items-center mt-14">
        <p class="font-bold text-white text-4xl">Your Pets</p>
        <div class="w-2/3 pt-5 text-center">
            <input class="h-10 w-1/2 bg-gray-200 focus:bg-gray-100 focus:outline-none rounded-lg p-5 shadow-lg" placeholder="Search pet's name" type="text" v-model="search">
        </div>
        <div class="flex flex-wrap justify-center w-2/3 mt-10 h-full">
            <PetCard v-if="result && !search" :pets="result" />
            <PetCard v-else-if="result && search" :pets="result" />
            <p v-if="result && result.length == 0 && !search" class="text-white">
                You don't have any pet. <router-link class="font-semibold underline" :to="{ name: 'CreatePet' }">Create one!</router-link>
            </p>
            <p v-else-if="result && result.length == 0 && search" class="text-white">Not found any pet's name match to '{{ search }}'</p>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import getPets from '@/composables/getPets'
import { computed, ref } from '@vue/reactivity'
import PetCard from '@/components/PetCard.vue'

export default {
    components: { PetCard },
    setup() {
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { data: pets } = getPets('petDetail')
        const search = ref('')

        const result = computed(() => {
            let res
            if(pets.value && search.value) {
                res = pets.value.filter(pet => pet.ownerDocID == userDetail.value.docId && pet.petsName.toLowerCase().includes(search.value))
            }
            else if(pets.value && !search.value) {
                res = pets.value.filter(pet => pet.ownerDocID == userDetail.value.docId)
            }
            return res
        })

        return { search, result }
    }
}
</script>