import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore'


const usePet = (collectionName) => {
    const isPending = ref(false)
    const error = ref(null)
    
    const create = async (doc) => {
        isPending.value = true
        error.value = null
        const collectionRef = collection(projectFirestore, collectionName)

        try {
            const res = await addDoc(collectionRef, doc)
            isPending.value = false
            return res
        }
        catch(err){
            isPending.value = false
            error.value = err.message
            console.log(error.value)
        }
    }

    const updatePhotoURL = async (id, url, path) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)
        
        try {
            await updateDoc(docRef, {
                photoURL: url,
                filePath: path
            })
        }
        catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    const updatePetName = async (id, name) => {
        error.value = null
        isPending.value = true
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            await updateDoc(docRef, {
                petsName: name
            })
            isPending.value = false
        }
        catch(err) {
            console.log(err.message)
            error.value = "Could not update your pet's name!"
            isPending.value = false
        }
    }

    return { isPending, error, create, updatePhotoURL, updatePetName }
}

export default usePet