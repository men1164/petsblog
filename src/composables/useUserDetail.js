import { projectFirestore } from "../firebase/config"
import { collection, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from "@firebase/firestore"
import { ref } from 'vue'

const useUserDetail = (collectionName) => {

    const error = ref(null)

    const initDetail = async (doc) => {
        error.value = null
        try {
            const res = await addDoc(collection(projectFirestore, collectionName), doc)
            return res
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    }

    const addPet = async (id, petId) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            await updateDoc(docRef, {
                ownPetsID: arrayUnion(petId)
            })
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const removePet = async (id, petId) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            await updateDoc(docRef, {
                ownPetsID: arrayRemove(petId)
            })
        }
        catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const followPet = async (id, petId, action) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            if(action === 'follow') {
                await updateDoc(docRef, {
                    followedPets: arrayUnion(petId)
                })
            }
            else {
                await updateDoc(docRef, {
                    followedPets: arrayRemove(petId)
                })
            }
        }
        catch(err) {
            console.log(err.message)
            error.value = "Could not add or remove pet id to followed list"
        }
    }

    const userVerify = async (id) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)
        try {
            await updateDoc(docRef, {
                isVeterinarian: true
            })
        }
        catch(err) {
            error.value = err.message
            console.log(err.message)
        }
    }

    const likedBlogsAction = async (id, blogId, action) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            if(action === 'like') {
                await updateDoc(docRef, {
                    likedBlogs: arrayUnion(blogId)
                })
            }
            else {
                await updateDoc(docRef, {
                    likedBlogs: arrayRemove(blogId)
                })
            }
        }
        catch(err) {
            console.log(err.message)
            error.value = 'Could not push or pop the liked blogs field'
        }
    }

    return { error, initDetail, userVerify, addPet, likedBlogsAction, followPet, removePet }
}

export default useUserDetail