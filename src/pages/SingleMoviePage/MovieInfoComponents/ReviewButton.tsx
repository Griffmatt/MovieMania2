import { useModalContext } from '../../../context/modalContext'
import { useUserContext } from '../../../context/userContext'
import { Ireview } from '../../../typescript/interfaces/review'

interface Props {
  review?: Ireview | null
  isLoading: boolean
}

function ReviewButton({ review, isLoading }: Props) {
  const { openReviewModal } = useModalContext()
  const { userId } = useUserContext()

  const handleClick = () => {
    if (userId === null) return
    openReviewModal()
  }
  if (isLoading) return <div className="movie-info__button"></div>
  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>{review ? 'Edit' : 'Add'} Review</h5>
    </button>
  )
}

export default ReviewButton
