import { useRef } from 'react'
import { useReviewModalContext } from '../../../context/reviewModalContext'
import { useSelector } from 'react-redux'
import { selectReview } from '../../../redux/reviewSlice'
import { Imovie } from '../../../typescript/interfaces/movie'
import { Ireview } from '../../../typescript/interfaces/review'

interface Props {
  movie: Imovie
}

function ReviewButton({ movie }: Props) {
  const { handleOpenReviewModal } = useReviewModalContext()
  const reviews = useSelector(selectReview)

  const review: Ireview | undefined = reviews.find(
    (review) => review.movieId === movie.id
  )

  const throttleRef = useRef(false)

  const handleClick = () => {
    if (throttleRef.current === false) {
      handleOpenReviewModal()
      throttleRef.current = true
      setTimeout(() => (throttleRef.current = false), 750)
    }
  }
  return (
    <>
      <button className="movie-info__button" onClick={handleClick}>
        <h5>{review ? 'Edit' : 'Add'} Review</h5>
      </button>
    </>
  )
}

export default ReviewButton
