import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'

const CONTACT_COLLECTION = 'contactMessages'
const CONTACT_STORAGE_KEY = 'elora-designs-contact-messages'

const normalizeMessage = (payload) => ({
  name: payload.name.trim(),
  email: payload.email.trim(),
  phone: payload.phone.trim(),
  subject: payload.subject.trim(),
  message: payload.message.trim(),
  createdAt: new Date().toISOString(),
})

export const submitContactMessage = async (payload) => {
  const message = normalizeMessage(payload)

  if (!db) {
    if (typeof window !== 'undefined') {
      const existingMessages = window.localStorage.getItem(CONTACT_STORAGE_KEY)
      const parsedMessages = existingMessages ? JSON.parse(existingMessages) : []
      window.localStorage.setItem(
        CONTACT_STORAGE_KEY,
        JSON.stringify([{ id: `contact-${Date.now()}`, ...message }, ...parsedMessages]),
      )
    }

    return message
  }

  await addDoc(collection(db, CONTACT_COLLECTION), message)
  return message
}
