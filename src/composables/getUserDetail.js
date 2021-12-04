import { projectFirestore } from '../firebase/config'
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'

/****
 * This composable use for get the detail of the user,
 * the special fields that Authentication service did not provide.
 * Arguments
 * - collectionName
 * - uid: use to match the user's id from authentication.
 * ****/
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