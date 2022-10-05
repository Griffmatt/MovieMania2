import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import db, { auth } from '../firebase'
import { Iuser } from '../typescript/interfaces/user'
import { getDoc, doc } from 'firebase/firestore'

type userId = string | null
interface Context {
  userId?: string | null
  userData?: Iuser | null
  handleSetUser: (userId: userId, userData: Iuser) => void
}
interface Props {
  children: ReactNode
}

export const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [userId, setUserId] = useState<string | null>()
  const [userData, setUserData] = useState<Iuser | null>()

  const handleSetUser = (userValue: userId, userData: Iuser) => {
    setUserId(userValue)
    setUserData(userData)
  }

  useEffect(() => {
    if (userId === undefined) return

    if (userId === null) {
      setUserData(null)
      return
    }
    console.log('e')
    const getUserData = async () => {
      const userDoc = await getDoc(doc(db, 'user', userId))
      setUserData(userDoc.data() as unknown as Iuser)
    }
    void getUserData()
  }, [userId])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
      return
    }
    setUserId(null)
    setUserData(null)
  })

  return (
    <UserContext.Provider value={{ userId, userData, handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}
