import { onAuthStateChanged } from '@firebase/auth'
import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser