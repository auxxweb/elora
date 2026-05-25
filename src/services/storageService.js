import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseSetupMessage, hasFirebaseEnv, storage } from '../firebase/config'

const ensureStorage = () => {
  if (!hasFirebaseEnv || !storage) {
    throw new Error(firebaseSetupMessage)
  }
}

const createStoragePath = (file) =>
  `products/${Date.now()}-${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`

export const uploadProductImages = async (files = []) => {
  ensureStorage()

  const uploads = await Promise.all(
    files.map(async (file) => {
      const fileRef = ref(storage, createStoragePath(file))
      await uploadBytes(fileRef, file)
      return getDownloadURL(fileRef)
    }),
  )

  return uploads
}
