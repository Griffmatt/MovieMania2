import { useRef } from 'react'
import { useModalContext } from '../../../context/modalContext'

function ReviewButton() {
  const { openReviewModal } = useModalContext()

  const throttleRef = useRef(false)

  const handleClick = () => {
    if (throttleRef.current === false) {
      openReviewModal()
      throttleRef.current = true
      setTimeout(() => (throttleRef.current = false), 750)
    }
  }
  return (
    <>
      <button className="movie-info__button" onClick={handleClick}>
        <h5>Review</h5>
      </button>
    </>
  )
}

export default ReviewButton
