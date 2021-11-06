import { collection, onSnapshot } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getPets = (collectionName, query) => {
    const error = ref(null)
    const pets = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)

    // if(query) {

    // }

    const unsub = onSnapshot(collectionRef, snap => {
        let results = []
        snap.docs.forEach(doc => {
            results.push({ ...doc.data(), docId: doc.id })
        })
        pets.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        pets.value = null
        error.value = 'Could not fetch the pets data!'
    })

    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { pets, error }
}

export default getPets