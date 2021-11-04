import { uploadBytes, ref, getDownloadURL } from '@firebase/storage'
import { ref as refVue } from '@vue/runtime-dom'
import { projectStorage } from '../firebase/config'

const useStorage = () => {
    const error = refVue(null)
    const url = refVue(null)
    const filePath = refVue(null)

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

    // ! TODO: Update code to version 9
    // const deleteImage = async(path) => {
    //     const storageRef = projectStorage.ref(path)

    //     try {
    //         await storageRef.delete()
    //     }
    //     catch(err) {
    //         console.log(err.message)
    //         error.value = err.message
    //     }
    // }

    return { url, filePath, error, uploadImage }
}

export default useStorage