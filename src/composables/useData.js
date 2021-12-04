import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, increment, onSnapshot, query, updateDoc, where, writeBatch } from '@firebase/firestore'

/****
 * Use for interact with document in the collection, such as update, create etc.
 * Argument
 * - collectionName 
 * ****/
const useData = (collectionName) => {
    const isPending = ref(false) // status
    const error = ref(null)
    
    /**
     * This function create new document in the collection.
     * Argument
     * - doc: object of the new document
     * Return a response after created.
     */
    const create = async (doc) => {
        isPending.value = true
        error.value = null
        const collectionRef = collection(projectFirestore, collectionName)

        try {
            const res = await addDoc(collectionRef, doc)
            isPending.value = false
            return res
        }
        catch(err){
            isPending.value = false
            error.value = err.message
            console.log(error.value)
        }
    }

    /**
     * This function is use for update photo url in the document after created,
     * because it needs to wait photo to upload in Cloud Storage first in order to get URL for display in front-end.
     * Arguments
     * - id: document's id to update
     * - url: file's url
     * - path: file's path in Cloud Storage, used when user wants to delete
     */
    const updatePhotoURL = async (id, url, path) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)
        
        try {
            await updateDoc(docRef, {
                photoURL: url,
                filePath: path
            })
        }
        catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    /**
     * Use for update pet's name.
     * Arguments
     * - id: document's id of the pet
     * - name: string, new pet's name
     */
    const updatePetName = async (id, name) => {
        error.value = null
        isPending.value = true
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            await updateDoc(docRef, {
                petsName: name
            })
            isPending.value = false
        }
        catch(err) {
            console.log(err.message)
            error.value = "Could not update your pet's name!"
            isPending.value = false
        }
    }

    /**
     * Use for increase or decrease likes amount in each blog.
     * Arguments
     * - id: document's id of the blog.
     * - action: string, recieve 2 actions, like or unlike
     */
    const toggleLike = async (id, action) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            if(action === 'like') {
                await updateDoc(docRef, {
                    likes: increment(1)
                })
            }
            else {
                await updateDoc(docRef, {
                    likes: increment(-1)
                })
            }
        }
        catch(err) {
            console.log(err.message)
            error.value = 'Could not change likes amount in document'
        }
    }

    /**
     * Use for increase or decrease followers amount in each pet.
     * Arguments
     * - id: document's id of the pet.
     * - action: string, recieve 2 actions, follow or unfollow
     */
    const toggleFollow = async (id, action) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            if(action === 'follow') {
                await updateDoc(docRef, {
                    followers: increment(1)
                })
            }
            else {
                await updateDoc(docRef, {
                    followers: increment(-1)
                })
            }
        }
        catch {
            console.log(err.message)
            error.value = 'Could not change following amount in the document'
        }
    }

    /**
     * Use to delete document in the collection
     * Argument
     * - id: document's id that user wants to delete 
     */
    const deleteDocument = async (id) => {
        error.value = null
        const docRef = doc(projectFirestore, collectionName, id)

        try {
            await deleteDoc(docRef)
        }
        catch(err) {
            console.log(err.message)
            error.value = 'Could not delete this document.'
        }
    }

    return { isPending, error, create, updatePhotoURL, updatePetName, toggleLike, toggleFollow, deleteDocument }
}

export default useData