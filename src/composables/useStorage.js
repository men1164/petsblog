import { uploadBytes, ref, getDownloadURL, deleteObject } from '@firebase/storage'
import { ref as refVue } from '@vue/runtime-dom'
import { projectStorage } from '../firebase/config'

/**
 * Use for interact with file in Cloud Storage
 */
const useStorage = () => {
    const error = refVue(null)
    const url = refVue(null)
    const filePath = refVue(null)

    /**
     * Use for upload new image to storage,
     * then get the url value.
     * Arguments
     * - file: photo's file that wants to upload
     * - id: string, to create a unique directory, based on document's id of the parent's data.
     * - folder: a root directory of each type of picture, such as, blogImg, petImg, profileImg etc.
     */
    const uploadImage = async (file, id, folder) => {
        filePath.value = `${folder}/${id}/${file.name}`
        const storageRef = ref(projectStorage, filePath.value)

        try {
            await uploadBytes(storageRef, file)
            url.value = await getDownloadURL(storageRef)
        }
        catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    /**
     * Use for delete image
     * Argument
     * - path: string, get from the document that user wants to delete.
     */
    const deleteImage = async(path) => {
        const storageRef = ref(projectStorage, path)

        try {
            await deleteObject(storageRef)
        }
        catch(err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage