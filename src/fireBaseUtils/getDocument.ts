import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'

export const getDocument = async <T>(
  collectionName: string,
  documentName?: string | null
) => {
  if (documentName == null) return documentName
  const docRef = doc(db, collectionName, documentName)
  const docValue = await getDoc(docRef)
  const docData = docValue.data() as T
  console.log(docData)
  return docData ?? null
}
