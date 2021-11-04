import { projectFirestore } from "../firebase/config"
import { collection, addDoc, updateDoc, doc, arrayUnion } from "@firebase/firestore"
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
            const res = await updateDoc(docRef, {
                ownPetsID: arrayUnion(petId)
            })
            // return res
        }
        catch(err) {
            error.value = err.message
            console.log(error.value)
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

    return { error, initDetail, userVerify, addPet }
}

export default useUserDetail