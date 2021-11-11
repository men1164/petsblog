import { collection, addDoc } from "@firebase/firestore"
import { projectFirestore } from "../firebase/config"
import { ref } from 'vue'


const useComment = (collectionName) => {
    const isPending = ref(false)
    const error = ref(null)

    const addComment = async (doc) => {
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

    return { isPending, error, addComment }
}

export default useComment