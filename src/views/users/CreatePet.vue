<template>
    <div class="max-w-lg h-auto mx-auto my-10 flex flex-col justify-center items-center">
        <p class="font-bold text-4xl text-white">Create your Pet!</p>
        <div class="w-44 h-44 object-cover rounded-full bg-gray-200 mt-3" v-if="!previewURL" >
            <img class="w-full h-full transform scale-75" src="@/assets/pawprint.png">
        </div>
        <div v-else class="mt-3">
            <img class="w-44 h-44 object-cover rounded-full" :src="previewURL">
        </div>
        <form class="mt-5 w-full" @submit.prevent="handleCreatePet">
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-1/2 px-3">
                    <p class="font-bold text-1xl text-white">Name</p>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="ChaThai" v-model="petsName" required>
                </div>

                <div class="w-1/2 px-3">
                    <p class="font-bold text-1xl text-white">Age</p>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" placeholder="Select Age (Years-old)" v-model="age" required>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3">
                <div class="w-1/2 px-3">
                    <p class="font-bold text-1xl text-white">Breed</p>
                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="American Shortthair" v-model="breed" required>
                </div>
                <div class="w-1/2 px-3">
                    <p class="font-bold text-1xl text-white">Gender</p>
                    <select class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" v-model="gender" required>
                        <option value="" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div class="flex items-center w-full mb-5 text-white font-bold">
                <p class="w-1/3">Pet's Profile Picture:</p>
                <input class="w-2/3" type="file" @change="handleChange">
            </div>
            <div class="flex justify-center">
                <div class="flex justify-end w-1/2 mr-3">
                    <button v-if="!isPending" class="py-2.5 text-red-600 text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" @click="handleCancel">Cancel</button>  
                </div>
                <div class="flex justify-start w-1/2 ml-3">
                    <button v-if="!isPending" class="py-2.5 text-primary-green text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" type="submit">Create</button>
                    <button v-else class="py-2.5 text-primary-green text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" type="submit" disabled>Creating...</button>
                </div>
            </div>
            <p class="text-white text-center mt-2">{{ fileError }}</p>
            <p class="text-white text-center mt-2">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import useData from '@/composables/useData'
import useUserDetail from '@/composables/useUserDetail'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const petsName = ref('')
        const gender = ref('')
        const age = ref(null)
        const breed = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const { isPending, error, create: createPet, updatePhotoURL } = useData('petDetail')
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { addPet } = useUserDetail('userDetail')
        const { url, filePath, uploadImage } = useStorage()
        const previewURL = ref(null)    /* using for preview image before upload */
        const router = useRouter()
        const types = ['image/png', 'image/jpeg']   /* acceptable file type */

        /**
         * Handle when user submit form to create pet,
         * send a request to backend.
         */
        const handleCreatePet = async () => {
            
            /* Validate name and breed, capitalize the first character */
            const capitalizeName = petsName.value[0].toUpperCase() + petsName.value.slice(1)
            const capitalizeBreed = breed.value[0].toUpperCase() + breed.value.slice(1)

            const petDoc = {
                petsName: capitalizeName,
                age: age.value,
                gender: gender.value,
                breed: capitalizeBreed,
                photoURL: '',
                filePath: '',
                followers: 0,
                ownerDocID: userDetail.value.docId,
                ownerName: user.value.displayName
            }

            if(file.value) {
                const res = await createPet(petDoc)
                await addPet(userDetail.value.docId, res.id)
                await uploadImage(file.value, res.id, 'petImg')
                await updatePhotoURL(res.id, url.value, filePath.value)
                router.push({ name: 'LandingPet', params: { id: res.id } })
            }
            else {
                fileError.value = 'Please select an image file (png or jpg)'
            }
        }

        /* Handle if user cancel to create a new pet */
        const handleCancel = () => {
            router.go(-1)
        }

        /**
         * Handle change event of file selected to detect the file type
         * is acceptable or not.
         */
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

        return { petsName, age, gender, breed, fileError, isPending, error, handleCreatePet, handleChange, previewURL, file, handleCancel }
    }
}
</script>
