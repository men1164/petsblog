<template>
    <div class="mx-auto flex flex-col jusify-center items-center relative h-full">
        <p class="font-bold text-4xl text-white">Create Blog</p>
        <img class="mt-2 w-full object-cover h-80" src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3029&q=80" alt="Banner" width="1920" height="288">
        <div class="absolute flex flex-row top-80 hover:bg-white bg-white w-1/2 p-4 rounded-2xl h-24 shadow-lg">
            <div class="flex flex-col">
                <input type="text" class="w-full font-bold text-2xl mx-2 focus:outline-none" placeholder="Title...">
                <p class="mt-8 mx-2 absolute font-bold text-xl">#</p>
            </div>
            <div class="follow ml-auto h-full bg-gray-300 p-2 rounded-2xl text-center">
                <p>O k</p>
                <p>Followers</p>
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-12 mx-4 flex items-center"> 
                <img class="profile w-16 h-16 rounded-full shadow-lg object-cover" src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=782&q=80">
                <div class="ml-3">
                    <p class="font-medium text-base">Owner: { OwnerName }</p>
                </div>
            </div>
            <div class="flex mt-5">
                <form class="w-full items-center">
                    <textarea class="w-full border-b-2 focus:outline-none" placeholder="Write your body.."></textarea>
                </form>
            </div>
            <div class="flex flex-row justify-center my-5">
                <button class="cancel py-2.5 p-10 text-red-600 text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Cancel</button>  
                <button class="create mx-8 py-2.5 p-10 text-primary-green text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
 .profile:hover {
     box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.2);
     transform: scale(1.01);
     transition: all ease 0.2s;
 }

 .cancel:hover {
     box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.3);
     transform: scale(1.03);
     transition: all ease 0.2s;
 }

 .create:hover {
     box-shadow: 1px 5px 10px rgba(50, 50, 50, 0.3);
     transform: scale(1.03);
     transition: all ease 0.2s;
 }
</style>