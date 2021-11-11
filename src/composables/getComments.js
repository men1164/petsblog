import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'
import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore'

const getComments = (collectionName, blogId) => {
    const error = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)
    const comments = ref(null)
    const q = query(collectionRef, where('blogId', '==', blogId), orderBy('createAt'))

    const unsub = onSnapshot(q, snap => {
        error.value = null
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createAt && results.push({ ...doc.data(), docId: doc.id })
        })
        if(results.length != 0) {
            comments.value = results
        }
        else {
            comments.value = null
        }
    }, err => {
        console.log(err.message)
        error.value = 'Could not get the comment data'
    })

    watchEffect((onValidate) => {
        onValidate(() => {
            unsub()
        })
    })

    return { error, comments }
}

export default getComments