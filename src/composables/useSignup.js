import { ref } from "vue"
import { projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"
import useUserDetail from "./useUserDetail"

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {

    error.value = null
    isPending.value = true

    try {
        const res = await createUserWithEmailAndPassword(projectAuth, email, password)
        if(!res) {
            throw new Error('Could not complete the signup')
        }
        await updateProfile(res.user, { displayName })
        error.value = null
        isPending.value = false
        return res
    }
    catch(err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const updatePhotoURL = async (user, url) => {
    try {
        await updateProfile(user, { photoURL: url })
    }
    catch(err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {
    return { error, signup, isPending, updatePhotoURL }
}

export default useSignup