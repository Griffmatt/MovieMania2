import { ReactNode } from 'react'
import { ThemeContextProvider } from './themeContext'
import { UserContextProvider } from './userContext'
import { ModalContextProvider } from './modalContext'

interface Props {
  children: ReactNode
}

export function CombinedContextProvider({ children }: Props) {
  return (
    <ThemeContextProvider>
      <ModalContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  )
}
