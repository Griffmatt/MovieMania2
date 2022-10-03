import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db, { auth } from '../firebase'
import { Iuser } from '../typescript/interfaces/user'

export const signUserIn = async (
  email: string,
  password: string,
  handleSetUser: (user: Iuser) => void,
  closeModal: () => void
) => {
  const user = await signInWithEmailAndPassword(auth, email, password)
  const userDoc = await getDoc(doc(db, 'user', `${user.user.uid}`))
  handleSetUser(userDoc.data() as unknown as Iuser)
  closeModal()
}
