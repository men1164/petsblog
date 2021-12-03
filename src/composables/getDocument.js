import { doc, onSnapshot } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

/**** 
 * This composable use for get a specific document in the collection,
 * mostly get pet's or blog's detail.
 * ****/
const getDocument = (collectionName, id) => {
    const error = ref(null)
    const document = ref(null)
    const docRef = doc(projectFirestore, collectionName, id)

    const unsub = onSnapshot(docRef, snap => {
        document.value = { ...snap.data(), docId: snap.id }
        error.value = null
    }, (err) => {
        console.log(err.message)
        document.value = null
        error.value = 'Could not fetch the blog data!'
    })

    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { document, error }
}

export default getDocument