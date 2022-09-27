import { createContext, ReactNode, useContext, useState } from 'react'

interface Context {
  modalOpen: boolean
  handleOpenReviewModal: () => void
}
interface Props {
  children: ReactNode
}

export const ReviewModalContext = createContext({} as Context)

export function useReviewModalContext() {
  return useContext(ReviewModalContext)
}

export function ReviewModalContextProvider({ children }: Props) {
  const [modalOpen, setModalopen] = useState(false)

  const handleOpenReviewModal = () => {
    setModalopen(!modalOpen)
  }

  return (
    <ReviewModalContext.Provider value={{ modalOpen, handleOpenReviewModal }}>
      {children}
    </ReviewModalContext.Provider>
  )
}
