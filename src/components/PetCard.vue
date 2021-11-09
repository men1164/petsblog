<template>
    <div v-for="pet in pets" :key="pet.docId" class="card bg-white rounded-3xl min-w-cardWidth min-h-cardHeight max-w-cardWidth max-h-cardHeight mb-7 mr-7 shadow-xl">
        <router-link :to="{ name: 'LandingPet', params: { id: pet.docId } }">
            <div class="flex flex-col w-full h-full">
                <div class="w-full h-2/3 relative">
                    <img class="h-full w-full object-cover rounded-t-3xl" :src="pet.photoURL">
                </div>
                <div class="w-full h-1/3 text-left pl-5 pt-3">
                    <p class="font-semibold text-lg">{{ pet.petsName }}</p>
                    <p class="mt-2 text-sm">Owner: {{ pet.ownerName }}</p>
                    <p class="text-sm">Gender: {{ pet.gender }}</p>
                    <p class="text-sm">Breed: {{ pet.breed }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['pets'],
    setup(props) {
        
    }
}
</script>

<style scoped>
.card:hover {
    box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.03);
    transition: all ease 0.2s;
}
</style>