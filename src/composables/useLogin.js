import { signInWithEmailAndPassword } from '@firebase/auth'
import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref('')
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true

    try {
        const res = await signInWithEmailAndPassword(projectAuth, email, password)
        if(!res) {
            throw new Error('Sign in Error occurs!')
        }
        error.value = null
        isPending.value = false
        return { res }
    }
    catch(err) {
        console.log(err.message)
        error.value = 'Invalid email or password!'
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, isPending, login }
}

export default useLogin