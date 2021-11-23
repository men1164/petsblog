<template>
    <div v-if="pet" class="mx-auto my-8 flex flex-col jusify-center items-center relative h-full">
        <p class="font-bold text-4xl text-white">Create Blog for {{ pet.petsName }}</p>
        <img class="mt-2 w-full object-cover h-80" :src="pet.photoURL" alt="Banner" width="1920" height="288">
        <div class="absolute flex flex-row top-80 hover:bg-white bg-white w-1/2 p-4 rounded-2xl h-auto shadow-lg">
            <div class="flex flex-col w-full h-full">
                <input type="text" class="w-full font-bold text-2xl mx-2 focus:outline-none" placeholder="Title..." v-model="title" required>
            </div>
        </div>
        <div class="bg-white w-full p-4 px-6 h-full flex flex-col">
            <div class="mt-20 mx-4 flex items-center"> 
                <div class="ml-12">
                    <p class="font-medium text-base" v-if="pet">Written By: {{ pet.ownerName }}</p>
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
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getPetDetail from '@/composables/getPetDetail'
import usePetOrBlog from '@/composables/usePetOrBlog'
import useStorage from '@/composables/useStorage'
import { serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'

export default {
    props: ['id'],
    setup(props) {
        const body = ref(null)
        const title = ref(null)
        const { pet } = getPetDetail('petDetail', props.id)
        const { isPending, error, create: createBlog, updatePhotoURL } = usePetOrBlog('petBlog')
        const { url, filePath, uploadImage } = useStorage()
        const file = ref(null)
        const fileError = ref(null)
        const previewURL = ref(null)
        const router = useRouter()
        const types = ['image/png', 'image/jpeg']

        const submitBlog = async () => {
            const docBlog = {
                title: title.value,
                body: body.value,
                photoURL: '',
                filePath: '',
                petDocID: props.id,
                petsName: pet.value.petsName,
                ownerName: pet.value.ownerName,
                comments: [],
                likes: 0,
                createAt: serverTimestamp()
            }

            if(file.value) {
                const res = await createBlog(docBlog)
                await uploadImage(file.value, res.id, 'blogImg')
                await updatePhotoURL(res.id, url.value, filePath.value)
                router.push({ name: 'Blogview', params: { blogId: res.id, petId: pet.value.docId } })
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

        return { body, submitBlog, pet, title, handleChange, fileError, error, previewURL, handleCancel, isPending }
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