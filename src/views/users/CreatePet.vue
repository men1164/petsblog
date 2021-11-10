<template>
  <div class="max-w-lg h-auto mx-auto my-0 flex flex-col justify-center items-center">
      <p class="font-bold text-4xl text-white">Pet Profile</p>
      <img class="w-56 h-56 mt-8 rounded-full object-cover" src="https://timesofindia.indiatimes.com/photo/67586673.cms">


  <form class="mt-5 w-full max-w-lg">
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
      <button class="cancel py-2.5 p-10 text-red-600 text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Cancel</button>  
    </div>

    <div class="w-full md:w-1/2 px-3">
      <button class="create mx-8 py-2.5 p-10 text-black text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg">Create</button>
    </div>
  </div>
  </div>

</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import usePet from '@/composables/usePet'
import useUserDetail from '@/composables/useUserDetail'
import useStorage from '@/composables/useStorage'

export default {
    setup() {
        const petsName = ref('')
        const gender = ref('')
        const age = ref(null)
        const breed = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const { isPending, error, create, updatePhotoURL } = usePet('petDetail')
        const { addPet } = useUserDetail('userDetail')
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { url, filePath, uploadImage } = useStorage()
        const previewURL = ref(null)

        const handleCreatePet = async () => {
            
            const capitalizeName = petsName.value[0].toUpperCase() + petsName.value.slice(1)
            const capitalizeBreed = breed.value[0].toUpperCase() + breed.value.slice(1)

            const petDoc = {
                petsName: capitalizeName,
                age: age.value,
                gender: gender.value,
                breed: capitalizeBreed,
                photoURL: '',
                filePath: '',
                ownerDocID: userDetail.value.docId,
                ownerName: user.value.displayName,
                blogID: []
            }

            if(file.value) {
                const res = await create(petDoc)
                // console.log(res.id)
                await addPet(userDetail.value.docId, res.id) // ! Maybe don't need it
                await uploadImage(file.value, res.id, 'petImg')
                await updatePhotoURL(res.id, url.value, filePath.value)
                // route to pet profile landing page
            }
            else {
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        const types = ['image/png', 'image/jpeg']

        const handleChange = e => {
            const selected = e.target.files[0]

            if(selected && types.includes(selected.type)) {
                file.value = selected
                previewURL.value = URL.createObjectURL(file.value)
                fileError.value = null
            }
            else {
                file.value = null
                fileError.value = 'Please select an image file (png or jpg)'
                console.log(fileError.value)
            }
        }

        return { petsName, age, gender, breed, fileError, isPending, error, handleCreatePet, handleChange, previewURL, file }
    }
}
</script>
