import db from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Iuser } from '../typescript/interfaces/user'

export const getCollection = async (
  collectionName: string,
  user?: Iuser | null
) => {
  if (user == null) return null
  const querySnapshot = await getDocs(collection(db, collectionName))

  return querySnapshot ?? null
}
