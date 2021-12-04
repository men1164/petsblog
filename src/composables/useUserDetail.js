import { projectFirestore } from "../firebase/config"
import { collection, addDoc, updateDoc, doc, arrayUnion, arrayRemove } from "@firebase/firestore"
import { ref } from 'vue'

/**
 * Use for interact with user's detail data
 * Argument
 * - collectionName
 */
const useUserDetail = (collectionName) => {

    const error = ref(null)

    /**
     * Call this function after sign up a new account,
     * to initial a new document of user's detail.
     * Argument
     * - doc: an object of initial data
     */
    const initDetail = async (doc) => {
        error.value = null
        try {
            await addDoc(collection(projectFirestore, collectionName), doc)
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    }

    /**
     * After user created pet, add pet's id to ownPets array in user's detail
     * Arguments
     * - id: document id of user's detail
     * - petId: document id of the pet
     */
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

    /**
     * Use when user wants to delete the pet.
     * Arguments
     * - id: document id of user's detail
     * - petId: document id of the pet
     */
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

    /**
     * Use when user toggle follow or unfollow pet,
     * add or remove pet's id in an followedPets array field
     * Arguments
     * - id: document id of user's detail
     * - petId: document id of the pet
     * - action: string, follow or unfollow
     */
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

    /**
     * Use when user wants to verify veterinarian mode in order to create veterinarian blog
     * Argument
     * - id: document id of user's detail
     */
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

    /**
     * Use when user toggle like or unlike the blog,
     * add or remove blog's id in likedBlogs array field
     * Arguments
     * - id: document id of user's detail
     * - blogId: document's id of the blog
     * - action: string, like or unlike
     */
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