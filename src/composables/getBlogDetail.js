import { doc, onSnapshot } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getBlogDetail = (collectionName, id) => {
    const error = ref(null)
    const blog = ref(null)
    const docRef = doc(projectFirestore, collectionName, id)

    const unsub = onSnapshot(docRef, snap => {
        blog.value = { ...snap.data(), docId: snap.id }
        error.value = null
    }, (err) => {
        console.log(err.message)
        blog.value = null
        error.value = 'Could not fetch the blog data!'
    })

    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { blog, error }
}

export default getBlogDetail