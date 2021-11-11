import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getPetsOrBlogs = (collectionName, queryOrId, mode) => {
    const error = ref(null)
    const data = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)
    

    if(queryOrId && mode === 'byQuery') {
        // ! Your pets
        console.log(queryOrId, mode)
    }
    else if (queryOrId && mode === 'byId') {
        // ! Each pet's blog
        console.log(queryOrId, mode)
        const q = query(collectionRef, where('petDocID', '==', queryOrId), orderBy('createAt', 'desc'))
        const unsub = onSnapshot(q, snap => {
            let results = []
            snap.docs.forEach(doc => {
                doc.data().createAt && results.push({ ...doc.data(), docId: doc.id })
            })
            console.log(results)
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
    } 
    else {
        const unsub = onSnapshot(collectionRef, snap => {
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
    }



    return { data, error }
}

export default getPetsOrBlogs