<template>
    <div class="ml-20">
        <p class="text-white font-semibold text-lg">News from our Veterinarian!</p>
    </div>
    <div class="blogcard-sm flex px-20 py-4 overflow-x-auto">
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
    </div>
    <div class="ml-20 mt-10">
        <p class="text-white font-semibold text-lg">New Blog from our members!</p>
    </div>
    <div class="petcard flex px-20 pt-4 pb-10 w-full overflow-x-auto">
        <PetCard v-if="pets" :pets="pets" />
    </div>
</template>

<script>
import PetCard from '@/components/PetCard.vue'
import BlogCardSM from '@/components/BlogCardSM.vue'
import { onMounted } from '@vue/runtime-core'
import getPets from '@/composables/getPets'

export default {
    components: { BlogCardSM, PetCard },
    setup() {
        const { pets, error } = getPets('petDetail')

        onMounted((e) => {
            const blogCard = document.querySelector('.blogcard-sm');
            const petCard = document.querySelector('.petcard');

            blogCard.addEventListener("wheel", e => {
                e.preventDefault();
                blogCard.scrollLeft += e.deltaY;
            });

            petCard.addEventListener("wheel", e => {
                e.preventDefault();
                petCard.scrollLeft += e.deltaY;
            });
        })
        // const handleScroll = e => {

        // }

        return { pets, error }
    }
}
</script>