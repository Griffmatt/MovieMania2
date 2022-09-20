import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
