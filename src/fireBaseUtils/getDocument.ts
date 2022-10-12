import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'

export const getDocument = async <T>(
  collectionName: string,
  documentName?: string | null
) => {
  if (documentName == null) return null
  const docRef = doc(db, collectionName, documentName)
  const docValue = await getDoc(docRef)
  const docData = docValue.data() as T
  return docData ?? null
}
