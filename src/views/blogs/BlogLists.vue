<template>
    <div class="ml-20 mt-15">
        <p class="text-white font-semobold text-lg">News from our Veterinarian!</p>
    </div>
    <div class="flex px-20 py-4 overflow-x-auto">
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
        <BlogCardSM />
    </div>
    <div class="ml-20 mt-10">
        <p class="text-white font-semobold text-lg">New Blog from our members!</p>
    </div>
    <div class="flex px-20 pt-4 pb-10 w-full overflow-x-auto">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
    </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
import BlogCardSM from '@/components/BlogCardSM.vue'

export default {
    components: { BlogCardSM, BlogCard },
    setup() {
        // const handleScroll = e => {

        // }

        // return { handleScroll }
    }
}
</script>