import { projectFirestore } from "../firebase/config"
import { collection, addDoc } from "@firebase/firestore"
import { ref } from 'vue'

const useUserDetail = (collectionName) => {

    const error = ref(null)

    const initDetail = async (doc) => {
        try {
            const res = await addDoc(collection(projectFirestore, collectionName), doc)
            return res
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
            error.value = null
        }
    }

    return { error, initDetail }
}

export default useUserDetail