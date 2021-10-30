import { projectFirestore } from "../firebase/config"
import { collection, addDoc, updateDoc, doc } from "@firebase/firestore"
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
        }
    }

    const userVerify = async (id) => {

        const docRef = doc(projectFirestore, 'userDetail', id)
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

    return { error, initDetail, userVerify }
}

export default useUserDetail