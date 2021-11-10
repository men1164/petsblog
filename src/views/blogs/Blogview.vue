<template>
    <div v-if="blog && pet" class="mx-auto flex flex-col jusify-center items-center relative h-full">
        <p class="font-bold text-4xl text-white">You're reading the blog from {{ pet.petsName }} !</p>
        <img class="mt-2 w-full object-cover h-80" :src="pet.photoURL" alt="Banner" width="1920" height="288">
        <div class="absolute flex flex-row top-80 hover:bg-white bg-white w-1/2 p-4 rounded-2xl h-24 shadow-lg">
            <div class="flex flex-col w-full h-full">
                <p class="w-full font-bold text-2xl mx-2">{{ blog.title }}</p>
                <!-- <p class="mt-8 mx-2 absolute font-bold text-xl">#</p> -->
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-20 mx-4 flex items-center"> 
                <!-- <img v-if="userDetail" class="profile w-16 h-16 rounded-full shadow-lg object-cover" :src="userDetail.photoURL"> -->
                <div class="ml-12">
                    <p class="font-semibold text-lg">Written by: {{ pet.ownerName }}</p>
                </div>
            </div>
            <div class="flex flex-col mt-5 mx-16">
                <p class="w-full h-full" v-for="paragraph in blog.body.split('\n')" :key="paragraph">{{ paragraph }}<br></p>
                <img class="w-2/3 h-auto mx-auto my-10 shadow-lg rounded-2xl" :src="blog.photoURL">
                <!-- <span class="textarea w-full focus:outline-none" role="textbox" contenteditable>
                    <input type="text" class="hidden">
                </span> -->
            </div>
        <!-- ! Comment Section -->
        </div>
    </div>
</template>

<script>
import getPetDetail from '@/composables/getPetDetail'
import getBlogDetail from '@/composables/getBlogDetail'

export default {
    props: ['blogId', 'petId'],
    setup(props) {
        const { blog } = getBlogDetail('petBlog', props.blogId)
        const { pet } = getPetDetail('petDetail', props.petId)

        return { blog, pet }
    }
}
</script>

<style>

</style>