import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Context {
  darkMode: boolean
  setDarkMode: Dispatch<SetStateAction<boolean>>
}
interface Props {
  children: ReactNode
}

export const ThemeContext = createContext({} as Context)

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
