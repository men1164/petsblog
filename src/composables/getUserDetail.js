import { projectFirestore } from '../firebase/config'
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'

const getUserDetail = (collectionName, uid) => {
        
    const userDetail = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)
    const res = query(collectionRef, where('userID', '==', uid))

    const unsub = onSnapshot(res, snap => {
        let result = []
        snap.docs.forEach(doc => {
            result.push({ ...doc.data(), docId: doc.id})
        })
        userDetail.value = result[0]
    })

    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { userDetail }
}

export default getUserDetail