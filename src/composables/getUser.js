import { onAuthStateChanged } from '@firebase/auth'
import { projectAuth, projectFirestore } from '../firebase/config'
import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'

const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
    user.value = _user
})

const getUser = () => {

    // watchEffect(onValidate => {
    //     onValidate(() => {
    //         unsub()
    //     })
    // })

    return { user }
}

export default getUser