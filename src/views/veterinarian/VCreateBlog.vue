<template>
    <div class="mx-auto my-8 flex flex-col jusify-center items-center relative h-full">
        <p class="font-bold text-4xl text-white">Create Veterinarian Blog</p>
        <img class="mt-2 w-full object-cover h-80" src="@/assets/cover-vblog.jpg" alt="Banner" width="1920" height="288">
        <div class="absolute flex flex-row top-80 hover:bg-white bg-white w-1/2 p-4 rounded-2xl h-24 shadow-lg">
            <div class="flex flex-col w-full h-full">
                <input type="text" class="w-full font-bold text-2xl mx-2 focus:outline-none" placeholder="Title..." v-model="title" required>
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-20 mx-4 flex items-center"> 
                <div class="ml-12">
                    <p class="font-medium text-base" v-if="user">Written By: Dr. {{ user.displayName }}</p>
                </div>
            </div>
            <div class="flex flex-col mt-5 mx-16">
                <textarea class="w-full h-full border-b-2 focus:outline-none" rows="10" placeholder="Write your body.." v-model="body" required></textarea>
                <img v-if="previewURL" class="w-1/2 h-auto mx-auto my-4 shadow-lg rounded-2xl" :src="previewURL">
                <div class="flex flex-row mt-4 items-center">
                    <p>Upload photo for this blog: </p>
                    <input class="ml-3" type="file" @change="handleChange" required>
                </div>
            </div>
            <div class="flex flex-row justify-center my-5">
                <button class="cancel py-2.5 p-10 text-red-600 text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" @click="handleCancel">Cancel</button>  
                <button v-if="!isPending" class="create mx-8 py-2.5 p-10 text-primary-green text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" @click="submitBlog">Create</button>
                <button v-else class="create mx-8 py-2.5 p-10 text-primary-green text-lg font-medium bg-white w-32 h-12 rounded-2xl shadow-lg" disabled>Posting..</button>
            </div>
            <p class="text-red-400 text-center">{{ fileError }}</p>
            <p class="text-red-400 text-center">{{ error }}</p>
            <p class="text-red-400 text-center">{{ permissionDenied }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import getUserDetail from '@/composables/getUserDetail'
import usePetOrBlog from '@/composables/usePetOrBlog'
import useStorage from '@/composables/useStorage'
import { serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const body = ref(null)
        const title = ref(null)
        const { user } = getUser()
        const { userDetail } = getUserDetail('userDetail', user.value.uid)
        const { isPending, error, create: createBlog, updatePhotoURL } = usePetOrBlog('veterinarianBlog')
        const { url, filePath, uploadImage } = useStorage()
        const file = ref(null)
        const fileError = ref(null)
        const previewURL = ref(null)
        const permissionDenied = ref(null)
        const router = useRouter()

        const submitBlog = async () => {
            permissionDenied.value = null
            const docBlog = {
                title: title.value,
                body: body.value,
                photoURL: '',
                filePath: '',
                username: user.value.displayName,
                userID: user.value.uid,
                likes: 0,
                createAt: serverTimestamp()
            }

            if(userDetail.value.isVeterinarian) {
                if(file.value) {
                    const res = await createBlog(docBlog)
                    await uploadImage(file.value, res.id, 'veterinarianBlogImg')
                    await updatePhotoURL(res.id, url.value, filePath.value)
                    router.push({ name: 'VBlogview', params: { blogId: res.id } })
                }
                else if(!title.value || !body.value) {
                    fileError.value = null
                    error.value = 'Please enter information before submit!'
                }
                else {
                    error.value = null
                    fileError.value = 'Please select an image file (png or jpg)'
                }
            }
            else {
                permissionDenied.value = "You don't have a permission to create veterinarian blog!"
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

        const handleCancel = () => {
            router.go(-1)
        }

        return { body, submitBlog, user, title, handleChange, fileError, error, previewURL, handleCancel, isPending, permissionDenied }
    }
}
</script>

<style scoped>
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