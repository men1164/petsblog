import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection } from '@firebase/firestore'


const usePet = (collectionName) => {
    const isPending = ref(false)
    const error = ref(null)
    
    const createPet = async (doc) => {
        isPending.value = true
        error.value = null

        try {
            const res = await addDoc(collection(projectFirestore, collectionName), doc)
            isPending.value = false
            return res
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    }

    return { isPending, error, createPet }
}

export default usePet