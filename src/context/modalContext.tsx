import { createContext, ReactNode, useContext, useState } from 'react'

interface Context {
  isOpenReview: boolean
  isOpenLogin: boolean
  openReviewModal: () => void
  openLoginModal: () => void
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
  const [isOpenReview, setIsOpenReview] = useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)

  const openReviewModal = () => {
    setIsOpenReview(true)
  }

  const openLoginModal = () => {
    setIsOpenLogin(true)
  }

  const closeModal = () => {
    setIsOpenReview(false)
    setIsOpenLogin(false)
  }

  return (
    <ModalContext.Provider
      value={{
        isOpenReview,
        isOpenLogin,
        openReviewModal,
        openLoginModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
