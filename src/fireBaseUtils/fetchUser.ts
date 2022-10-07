import db from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Iuser } from '../typescript/interfaces/user'

export const fetchUser = async (profileId?: string) => {
  if (profileId === undefined) return null
  const userDoc = await getDoc(doc(db, 'user', profileId))
  const user = userDoc.data() as Iuser
  return user ?? null
}
