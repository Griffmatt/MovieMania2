import { useRef } from 'react'
import { useModalContext } from '../../../context/modalContext'
import { Ireview } from '../../../typescript/interfaces/review'

interface Props {
  review?: Ireview | null
  isLoading: boolean
}

function ReviewButton({ review, isLoading }: Props) {
  const { openReviewModal } = useModalContext()

  const throttleRef = useRef(false)

  const handleClick = () => {
    if (throttleRef.current === false) {
      openReviewModal()
      throttleRef.current = true
      setTimeout(() => (throttleRef.current = false), 750)
    }
  }
  if (isLoading) return <div className="movie-info__button"></div>
  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>{review ? 'Edit' : 'Add'} Review</h5>
    </button>
  )
}

export default ReviewButton
