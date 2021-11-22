import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getPets = (collectionName, qr) => {
    const error = ref(null)
    const data = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)
    let q

    if(qr) {
        q = query(collectionRef, where(...qr))
    }
    else {
        q = collectionRef
    }
    
    const unsub = onSnapshot(q, snap => {
        let results = []
        snap.docs.forEach(doc => {
            results.push({ ...doc.data(), docId: doc.id })
        })
        if(results.length != 0) {
            data.value = results
        }
        else {
            data.value = null
        }
        error.value = null
    }, (err) => {
        console.log(err.message)
        data.value = null
        error.value = 'Could not fetch the data!'
    })
        
    watchEffect(onValidate => {
        onValidate(() => {
            unsub()
        })
    })

    return { data, error }
}

export default getPets