import { useEffect } from 'react'

export default function useCloseModal(
  modalRef: React.RefObject<HTMLDivElement>,
  closeModal: () => void
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
}
