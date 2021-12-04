import { ref } from "vue"
import { projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth"

const error = ref(null)
const isPending = ref(false) // request's status

/**
 * Use for signup with email and password
 * Arguments
 * - email
 * - password
 * - displayName: to input a display name after created user with email and password.
 * Return a response value.
 */
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

/**
 * Use for update profile photo url, becuase it needs to wait the photo uploaded into Cloud Storage first,
 * then we'll get a url to display photo in front-end.
 * Arguments
 * - user: an object to reference to the user, get from returned response in signup function.
 * - url: string, a photo url.
 */
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