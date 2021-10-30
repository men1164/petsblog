import { onAuthStateChanged } from '@firebase/auth'
import { projectAuth, projectFirestore } from '../firebase/config'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { ref } from 'vue'

const user = ref(projectAuth.currentUser)

onAuthStateChanged(projectAuth, _user => {
    user.value = _user
})

const getUserDetail = async (collectionName) => {
    
    let userDetail
    const collectionRef = collection(projectFirestore, collectionName)
    const res = query(collectionRef, where('userID', '==', user.value.uid))

    const detailDocs = await getDocs(res)
    detailDocs.forEach(doc => {
        userDetail = doc.data()
    })

    // console.log(userDetail)

    return userDetail
}

const getUser = () => {
    return { user, getUserDetail }
}

export default getUser