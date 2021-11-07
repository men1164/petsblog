import { doc, onSnapshot } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getPetDetail = (collectionName, id) => {
    const error = ref(null)
    const pet = ref(null)
    const docRef = doc(projectFirestore, collectionName, id)

    const unsub = onSnapshot(docRef, snap => {
        pet.value = snap.data()
        error.value = null
    }, (err) => {
        console.log(err.message)
        pet.value = null
        error.value = 'Could not fetch the pet data!'
    })

    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { pet, error }
}

export default getPetDetail