<template>
  <div class="landing-content h-full">
    <div class="h-full w-full bg-white text-black">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt doloremque asperiores repellendus culpa, consequatur omnis nesciunt quasi quas, et labore impedit, autem totam ratione? Illo aliquam eum delectus rem porro?</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus natus est magni. Perferendis eos voluptates expedita fugit excepturi aspernatur iure! Praesentium, quam temporibus ad voluptates laudantium adipisci non natus cum.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa autem minima voluptates similique cum est modi perferendis necessitatibus, magni rerum et quis non nisi perspiciatis vero. Minima laborum reiciendis consequatur?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga odit praesentium, nihil quos doloribus eos fugit qui vitae impedit harum iste nesciunt rerum expedita unde minus explicabo, modi quibusdam saepe.</p>
    </div>
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

<script>

export default {

}
</script>
