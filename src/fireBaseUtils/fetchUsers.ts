import db from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Iuser } from '../typescript/interfaces/user'

export const fetchUsers = async (user?: Iuser | null) => {
  if (user == null) return null
  const querySnapshot = await getDocs(collection(db, 'user'))
  const users = [] as Iuser[]
  querySnapshot.forEach((doc) => {
    if (user.uid === doc.id) return
    users.push(doc.data() as Iuser)
  })
  return users ?? null
}
