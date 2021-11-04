import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore'


const usePet = (collectionName) => {
    const isPending = ref(false)
    const error = ref(null)
    
    const createPet = async (doc) => {
        isPending.value = true
        error.value = null

        try {
            const res = await addDoc(collection(projectFirestore, collectionName), doc)
            // isPending.value = false
            return res
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    }

    const updatePetPhotoURL = async (id, url) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)
        
        try {
            await updateDoc(docRef, {
                photoURL: url
            })
        }
        catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { isPending, error, createPet, updatePetPhotoURL }
}

export default usePet