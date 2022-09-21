import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface Context {
  user: {
    name: string
    userName: string
    image: string
    joinDate: string
  }
  setUser: Dispatch<
    SetStateAction<{
      name: string
      userName: string
      image: string
      joinDate: string
    }>
  >
}
interface Props {
  children: ReactNode
}

export const UserContext = createContext({} as Context)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState({
    name: 'griffin',
    userName: '@griffin',
    image: '/Images/profileImage.png',
    joinDate: 'August 2022',
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
