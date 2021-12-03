import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'


/**** 
 * This composables is using for get many documents in each collection, query only if needed  
 * Recieve 3 arguments
 * - collectionName: for getting data from that collection.
 * - get: use to specify a type of data, to perform difference queries. (blogs, pets or comments)
 * - qr: for getting the query array to spread to 'where' method.
 * ****/
const getCollection = (collectionName, get, qr) => {
    const error = ref(null)
    const data = ref(null)
    const collectionRef = collection(projectFirestore, collectionName)
    let q   /* a data refences if query is needed */

    /****
     * Conditions 
     * - to get blogs or comments are need to order by a time that created 
     * - to query pets, needs only where, no order
     * - otherwise, get data without query but order by time created, use for get all blogs mostly.
     * ****/
    if(qr && (get === 'blogs' || get === 'comments')) {
        q = query(collectionRef, where(...qr), orderBy('createAt', 'desc'))
    }
    else if(get === 'pets') {
        if(qr) {
            q = query(collectionRef, where(...qr))       
        }
        else {
            q = collectionRef
        }
    }
    else {
        q = query(collectionRef, orderBy('createAt', 'desc'))
    }

    /**** Realtime listener ****/
    const unsub = onSnapshot(q, snap => {
        let results = []

        /**** To get blogs or comments, needs to wait until the server create timestamps in the data  ****/
        if(get === 'blogs' || get === 'comments') {
            snap.docs.forEach(doc => {
                doc.data().createAt && results.push({ ...doc.data(), docId: doc.id })
            })
        }
        else {
            snap.docs.forEach(doc => {
                results.push({ ...doc.data(), docId: doc.id })
            })
        }

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

export default getCollection