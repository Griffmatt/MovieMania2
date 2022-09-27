import { useReviewModalContext } from '../../../context/reviewModalContext'

function ReviewButton() {
  const { handleOpenReviewModal } = useReviewModalContext()
  return (
    <>
      <button className="movie-info__button" onClick={handleOpenReviewModal}>
        <h5>Add Review</h5>
      </button>
    </>
  )
}

export default ReviewButton
