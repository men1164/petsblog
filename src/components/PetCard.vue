<template>
    <div class="card bg-white rounded-3xl min-w-cardWidth min-h-cardHeight max-w-cardWidth max-h-cardHeight mb-7 mr-7 shadow-xl">
        <div class="flex flex-col w-full h-full">
            <div class="w-full h-2/3 relative">
                <img class="absolute top-1 right-3 h-10 w-10" src="@/assets/new.png">
                <img class="h-full w-full object-cover rounded-t-3xl" src="@/assets/demo-petcard.jpg">
            </div>
            <div class="w-full h-1/3 text-left pl-5 pt-3">
                <p class="font-semibold">{ Pet's Name }</p>
                <p class="mt-2 text-sm">Owner: { displayName }</p>
                <p class="text-sm">Gender: { Gender }</p>
                <p class="text-sm">Breed: { Breed }</p>
            </div>
        </div>
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