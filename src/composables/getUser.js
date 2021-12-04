import { onAuthStateChanged } from '@firebase/auth'
import { projectAuth } from '../firebase/config'
import { ref } from 'vue'


/**** 
 * This composable use for get the currently user that signed in,
 * listen for changes if another user logging in.
 * ****/
const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser