<template>
    <div class="card-sm bg-white shadow-lg rounded-3xl min-w-cardWidth-sm min-h-cardHeight-sm mr-7">
        <div class="flex flex-row h-full w-full">
            <div class="h-full w-1/3">
                <img class="h-full w-full object-cover rounded-l-3xl" src="@/assets/demo-veteblog.jpg">
            </div>
            <div class="h-full w-2/3 text-left p-3 relative">
                <p class="font-medium">Sterilization of the cat asdasdasad</p>
                <p class="absolute bottom-2 left-3 text-sm">By: Dr. { displayName }</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card-sm:hover {
    box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.03);
    transition: all ease 0.2s;
}
</style>