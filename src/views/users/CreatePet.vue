<template>
  <div class="max-w-lg h-auto mx-auto my-0 flex flex-col justify-center items-center">
      <p class="font-bold text-4xl text-white">Pet Profile</p>
      <img class="w-56 h-56 mt-8 rounded-full object-cover" src="https://timesofindia.indiatimes.com/photo/67586673.cms">
      <p class="font-medium mt-2 text-white">Edit</p>


  <form class="w-full max-w-lg">
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <p class="font-bold text-1xl text-white">Name</p>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Cha Thai">
    </div>

    <div class="w-full md:w-1/2 px-3">
      <p class="font-bold text-1xl text-white">Age</p>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="3 Years old">
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <p class="font-bold text-1xl text-white">Breed</p>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="American Shortthair">
    </div>

    <div class="w-full md:w-1/2 px-3">
      <p class="font-bold text-1xl text-white">Gender</p>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Female">
    </div>
  </div>
  </form>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">Cancel</button>
    </div>

    <div class="w-full md:w-1/2 px-3">
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">Create</button>
    </div>
  </div>
  </div>

</template>

<script>
export default {

}
</script>