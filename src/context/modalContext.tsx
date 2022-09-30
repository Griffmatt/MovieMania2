import { createContext, ReactNode, useContext, useState } from 'react'

interface Context {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
interface Props {
  children: ReactNode
}

export const ModalContext = createContext({} as Context)

export function useModalContext() {
  return useContext(ModalContext)
}

export function ModalContextProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
