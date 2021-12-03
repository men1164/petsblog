<template>
  <div class="landing-content h-full">
    <div class="flex flex-col justify-center w-2/3 mx-auto h-3/4 my-28">
      <div class="text-white">
        <p class="font-bold text-5xl">Sharing your pet story.</p>
        <p class="mt-3 font-bold text-5xl">Reading how CUTE they are!</p>
        <p class="mt-4 font-normal text-base">The more information, the safer and happier your pet is...</p>
        <p class="mt-1 font-normal text-base">Let’s join our community. You will learn a lot about your pet that you did not know before!</p>
      </div>
      <div class="mt-4">
        <router-link :to="{ name: 'Login' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md mr-2">Login</router-link>
        <router-link :to="{ name: 'Signup' }" class="rounded-xl bg-gray-200 border-0 cursor-pointer inline-block py-2 px-3 shadow-md">Signup</router-link>
      </div>
    </div>
  </div>
</template>
