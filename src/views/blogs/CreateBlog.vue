<template>
 <div class="mx-auto flex flex-col jusify-center items-center">
     <p class="font-bold text-4xl text-white">Blog</p>
 </div>
 <div class="flex relative">
     <botton class="mt-8 text-2xl text-white text-sha font-bold self-center text-center absolute w-full md:text-2xl">Edit</botton>
     <div class=" mt-80 absolute hover:bg-white bg-white w-full p-4 px-6 h-screen">
         <div class="mt-16 mx-4 flex relative"> 
             <img class="w-16 h-16 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1611558709798-e009c8fd7706?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=782&q=80">
                     <div flex flex-col>
                         <p class="font-medium text-base mx-6 mt-2">Author: Sj Noolek</p>
                         <p class="font-extralight text-sm text-gray-400 m-6 mt-0.5">3 minutes ago</p>
                         <p class="font-normal text-lg text-black m-8 mt-0.5">Write your blog...</p>
                     </div>
             </div>
         </div>
         <div class="absolute hover:bg-white bg-white w-6/12 mx-96 p-4 px-6 rounded-2xl mt-72 h-24 shadow-lg">
             <div class="flex relative">
                 <div class="flex flex-col">
                     <p class="text-2xl mx-2 text-black font-bold text-left absolute md:text-2xl">Title...</p>
                     <button class="mt-8 mx-2 absolute md:underline">Select your pet</button>
                 </div>
                 <div class="mx-96">
                     <button class=" mx-44 absolute hover:bg-green- bg-gray-300 p-2 px-4 rounded-2xl">0K followers</button>
                 </div>
             </div> 
         </div>
         <img class="mt-4 w-full object-cover h-80 block mx-auto sm:block sm:w-full" src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3029&q=80" alt="Banner" width="1920" height="288">
         <div class="absolute -bottom-96 mx-96">
             <div class="flex flex-row absolute -bottom-72 mx-52">
                 <button class="py-2.5 p-10 text-red-600 text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Cancel</button>  
                 <button class="mx-8 py-2.5 p-10 text-black text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Create</button>
             </div>   
         </div>
 </div>
</template>

<script>
export default {

}
</script>