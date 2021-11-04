import { onAuthStateChanged } from '@firebase/auth'
import { projectAuth } from '../firebase/config'
import { ref } from 'vue'

const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser