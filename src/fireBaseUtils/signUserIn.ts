import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db, { auth } from '../firebase'
import { Iuser } from '../typescript/interfaces/user'

export const signUserIn = async (
  handleSetUser: (userId: string, userData: Iuser) => void,
  closeModal: () => void,
  email?: string | null,
  password?: string | null
) => {
  if (email == null || password == null) return
  const user = await signInWithEmailAndPassword(auth, email, password)
  const userDoc = await getDoc(doc(db, 'user', user.user.uid))
  handleSetUser(
    user.user.uid as unknown as string,
    userDoc.data() as unknown as Iuser
  )
  closeModal()
}
