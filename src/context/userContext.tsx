import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Iuser } from '../typescript/interfaces/user'

type userValue = Iuser | null
interface Context {
  user: Iuser | null
  handleSetUser: (user: userValue) => void
}
interface Props {
  children: ReactNode
}

export const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<Iuser | null>(null)

  const handleSetUser = (userValue: userValue) => {
    setUser(userValue)
    localStorage.setItem('user', JSON.stringify(userValue))
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    console.log(storedUser)
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser) as Iuser
      setUser(parsedUser)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      {children}
    </UserContext.Provider>
  )
}
