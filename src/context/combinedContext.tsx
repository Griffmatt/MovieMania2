import { ReactNode } from 'react'
import { ThemeContextProvider } from './themeContext'
import { UserContextProvider } from './userContext'

interface Props {
  children: ReactNode
}

export function CombinedContextProvider({ children }: Props) {
  return (
    <ThemeContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </ThemeContextProvider>
  )
}
