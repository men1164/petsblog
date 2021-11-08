<template>
    <div class="flex flex-col h-full w-auto items-center">
        <div class="pet-profile text-white bg-white bg-opacity-25 rounded-3xl w-1/3 h-full text-center p-6 shadow-xl mb-10">
            <img class="my-3 mx-auto object-cover w-40 h-40 rounded-full" :src="pet.photoURL">
            <p class="font-semibold text-xl mb-2">{{ pet.petsName }}</p>
            <p class="text-base">Owner: {{ pet.ownerName }}</p>
            <p class="text-base">Gender: {{ pet.gender }}</p>
            <p class="text-base">Breed: {{ pet.breed }}</p>
        </div>
        <div class="w-2/3 h-full">
            <div class="w-full">
                <p class="font-semibold text-lg text-white border-b-2">Blogs from {{ pet.petsName }} !</p>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import getPetDetail from '@/composables/getPetDetail'

export default {
    props: ['id'],
    setup(props) {
        const { pet, error } = getPetDetail('petDetail', props.id)

        // ! Computed is owner?

        return { pet, error }
    }
}
</script>

<style scoped>
.pet-profile {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

</style>