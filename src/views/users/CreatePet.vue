<template>
    <!-- Mockup Form -->
    <form @submit.prevent="handleCreatePet" class="max-w-400 mx-auto my-0 p-7 rounded-md shadow-lg border-solid bg-white">
        <h3>Create Pet</h3>
        <div v-if="!file" class="w-28 h-28 rounded-full object-cover mx-auto">
            <img class="transform scale-75" src="@/assets/pawprint.png">
        </div>
        <div v-else>
            <img class="w-28 h-28 rounded-full object-cover mx-auto" :src="previewURL">
        </div>
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-2" type="text" placeholder="Pet's Name" v-model="petsName" required>
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="text" placeholder="Breed" v-model="breed" required>
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="number" placeholder="Age (Years old)" v-model="age" required>
        <select class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-2" v-model="gender" required>
            <option disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
        </select>
        <p>Pet's Profile Picture:</p>
        <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto" type="file" placeholder="Password" @change="handleChange" required>
        <div class="text-sm text-red-500" v-if="error">{{ error }}</div>
        <div class="text-sm text-red-500" v-if="fileError">{{ fileError }}</div>
        <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="!isPending">Create Pet</button>
        <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="isPending" disabled>Loading</button>
    </form>
    <!-- Mockup Form -->
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
        const gender = ref(null)
        const age = ref(null)
        const breed = ref('')
        const file = ref(null)
        const fileError = ref()
        const { isPending, error, createPet, updatePetPhotoURL } = usePet('petDetail')
        const { addPet } = useUserDetail('userDetail')
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { url, uploadImage } = useStorage()
        const previewURL = ref(null)

        const handleCreatePet = async () => {

            const petDoc = {
                petsName: petsName.value,
                age: age.value,
                gender: gender.value,
                breed: breed.value,
                photoURL: '',
                ownerDocID: userDetail.value.docId,
                blogID: []
            }

            if(file.value) {
                const res = await createPet(petDoc)
                // console.log(res.id)
                await addPet(userDetail.value.docId, res.id)
                await uploadImage(file.value, res.id, 'petImg')
                await updatePetPhotoURL(res.id, url.value)
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