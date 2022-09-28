import { useEffect } from 'react'

export default function useCloseModal(
  modalRef: React.RefObject<HTMLDivElement>,
  closeModal: () => void,
  modalOpen: boolean
) {
  useEffect(() => {
    function handleClickOutside(event: { target: Node | null }) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal()
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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
