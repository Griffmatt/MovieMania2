import { useEffect } from 'react'

export default function useCloseModal(
  modalRef: React.RefObject<HTMLDivElement>,
  closeModal: () => void,
  modalOpen: boolean
) {
  useEffect(() => {
    function handleClickOutside(target: Node) {
      if (modalRef.current && !modalRef.current.contains(target)) {
        closeModal()
      }
    }

    function handleEscapePress(key: string) {
      if (key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('mousedown', (event) =>
      handleClickOutside(event.target as Node)
    )
    document.addEventListener('keydown', (event) =>
      handleEscapePress(event.key)
    )
    return () => {
      document.removeEventListener('mousedown', (event) =>
        handleClickOutside(event.target as Node)
      )
    }
  }, [modalRef, closeModal])

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [modalOpen])
}
