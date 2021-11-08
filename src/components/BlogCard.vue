<template>
    <div class="card flex flex-row items-center bg-white rounded-3xl w-full h-28 mb-7 shadow-lg">
        <div class="w-1/4 h-full">
            <img class="w-full h-full object-cover rounded-l-3xl" src="@/assets/demo-petcard.jpg">
        </div>
        <div class="flex flex-col w-3/5 h-full p-3 ml-2">
            <p class="font-semibold text-2xl mb-2 truncate">{ Pet's Name }: Yayyyyyyy asdasdasdasdasdasdadasdaddadasd</p>
            <p class="font-normal text-base">Owner: { OwnerName }</p>
            <p class="font-normal text-base truncate">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem officia adipisci reprehenderit maiores sapiente? Laborum ab aspernatur odio soluta nulla vero eius, blanditiis porro a nisi repellendus, excepturi repellat saepe!</p>
        </div>
        <p class="ml-9 text-sm text-gray-400">3 days ago</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.card:hover {
    box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.03);
    transition: all ease 0.2s;
}
</style>