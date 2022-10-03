import { ReactNode, useRef, useEffect } from 'react'
import { useModalContext } from '../../context/modalContext'

import useCloseModal from '../../hooks/useCloseModal'

interface Props {
  title: string
  children: ReactNode
}

function Modal({ children, title }: Props) {
  const { isOpenLogin, isOpenReview, closeModal } = useModalContext()
  const modalRef = useRef<HTMLDivElement>(null)
  useCloseModal(modalRef, closeModal)

  useEffect(() => {
    if (isOpenReview || isOpenLogin) {
      document.body.classList.add('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isOpenLogin, isOpenReview])

  return (
    <div className="transition-height h-full w-full flex justify-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20">
      <div
        className="bg-bg-primary dark:bg-bg-primary-dark rounded-xl w-[90%] md:w-[40rem] h-min z-30 p-8 relative top-[15%]"
        aria-hidden="true"
        ref={modalRef}
      >
        <h2 className="text-2xl w-full text-left pb-2">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal
