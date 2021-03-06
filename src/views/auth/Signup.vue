<template>
    <div class="max-w-400 mx-auto my-10 p-7 rounded-md shadow-lg border-solid bg-white">
        <form @submit.prevent="handleSignup" class="mb-3">
            <h3>Sign up</h3>
            <div v-if="!file">
                <img class="w-28 h-28 rounded-full object-cover mx-auto" src="@/assets/default-user-profile.jpeg">
            </div>
            <div v-else>
                <img class="w-28 h-28 rounded-full object-cover mx-auto" :src="previewURL">
            </div>
            <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-2" type="text" placeholder="Display Name" v-model="displayName" required>
            <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="email" placeholder="Email" v-model="email" required>
            <input class="border-b border-gray-300 p-2 outline-none block w-full mx-auto my-5" type="password" placeholder="Password" v-model="password" required>
            <p>Profile Picture:</p>
            <input class="border-b border-gray-300 p-2 outline-none w-full mx-auto" type="file" placeholder="Password" @change="handleChange" required>
            <div class="text-sm text-red-500" v-if="error">{{ error }}</div>
            <div class="text-sm text-red-500" v-if="fileError">{{ fileError }}</div>
            <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="!isPending">Sign up</button>
            <button class="mt-5 rounded-xl bg-gray-300 border-0 cursor-pointer inline-block py-2 px-3" v-if="isPending" disabled>Loading</button>
        </form>
        <router-link :to="{ name: 'Login' }" class="text-sm underline">Already have an account?</router-link>
    </div>
</template>

<script>
import useSignup from '@/composables/useSignup'
import useStorage from '@/composables/useStorage'
import useUserDetail from '@/composables/useUserDetail'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const password = ref('')
        const displayName = ref('')
        const file = ref(null)
        const fileError = ref(null) /* error message about file */
        const router = useRouter()
        const { url, uploadImage } = useStorage()
        const { initDetail } = useUserDetail('userDetail')
        const types = ['image/png', 'image/jpeg']   /* acceptable file type */
        const previewURL = ref(null)    /* using for preview image before upload */

        const { error, signup, isPending, updatePhotoURL } = useSignup()

        /**
         * Handle submit form to send a signup request
         */
        const handleSignup = async () => {

            if(file.value) {
                const res = await signup(email.value, password.value, displayName.value, file.value)
                await uploadImage(file.value, res.user.uid, 'profileImg')
                await updatePhotoURL(res.user, url.value)
    
                /* Initial user's detail object when sign up */
                const initDoc = {
                    userID: res.user.uid,
                    username: res.user.displayName,
                    isVeterinarian: false,
                    followedPets: [],
                    ownPetsID: [],
                    likedBlogs: []
                }
                await initDetail(initDoc)
                if(!error.value) {
                    router.push({ name: 'Explore' })
                }
            }
            else {
                fileError.value = 'Please select an image file (png or jpg)'
            }
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

        return { email, password, displayName, isPending, error, handleSignup, handleChange, fileError, file, previewURL }
    }
}
</script>