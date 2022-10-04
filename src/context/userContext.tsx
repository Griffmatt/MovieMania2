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

type userValue = string | null
interface Context {
  user: string | null
  userData?: Iuser | null
  handleSetUser: (user: userValue, userData: Iuser) => void
}
interface Props {
  children: ReactNode
}

export const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<string | null>(null)
  const [userData, setUserData] = useState<Iuser | null>()

  const handleSetUser = (userValue: userValue, userData: Iuser) => {
    setUser(userValue)
    setUserData(userData)
  }

  useEffect(() => {
    if (user === undefined) return

    if (user === null) {
      setUserData(null)
      return
    }
    console.log('e')
    const getUserData = async () => {
      const userDoc = await getDoc(doc(db, 'user', user))
      setUserData(userDoc.data() as unknown as Iuser)
    }
    void getUserData()
  }, [user])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid)
      return
    }
    setUser(null)
    setUserData(null)
  })

  return (
    <UserContext.Provider value={{ user, userData, handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}
