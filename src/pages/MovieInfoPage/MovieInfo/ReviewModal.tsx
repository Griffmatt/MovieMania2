import { useRef, useState, useId, useEffect } from 'react'
import { addReview, updateReview } from '../../../redux/reviewSlice'
import { useDispatch } from 'react-redux'
import { useUserContext } from '../../../context/userContext'
import { useSelector } from 'react-redux'
import { selectReview } from '../../../redux/reviewSlice'

import { Imovie } from '../../../typescript/interfaces/movie'

import { useReviewModalContext } from '../../../context/reviewModalContext'
import useCloseModal from '../../../hooks/useCloseModal'

import { Ireview } from '../../../typescript/interfaces/review'
import StarRating from './StarRating'

interface Props {
  movie: Imovie
}

function ReviewModal({ movie }: Props) {
  const reviews = useSelector(selectReview)

  const userReview: Ireview | undefined = reviews.find(
    (review) => review.movieId === movie.id
  )
  const [rating, setRating] = useState<number>(userReview?.rating ?? 5)
  const [review, setReview] = useState(userReview?.review ?? '')
  const [error, setError] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  const id = useId()

  const { modalOpen, handleOpenReviewModal } = useReviewModalContext()

  const { user } = useUserContext()

  useCloseModal(modalRef, handleOpenReviewModal, modalOpen)

  const dispatch = useDispatch()

  useEffect(() => {
    setError(false)
  }, [modalOpen])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (review === '') {
      setError(true)
      return
    }
    if (userReview && rating) {
      handleOpenReviewModal()
      dispatch(
        updateReview({ review: review, rating: rating, id: userReview.id })
      )
      return
    }
    if (rating !== null && review !== '') {
      handleOpenReviewModal()
      dispatch(
        addReview({
          movieId: movie.id,
          title: movie.title,
          name: user.name,
          userId: user.id,
          date: new Date().toLocaleDateString(),
          rating: rating,
          review: review,
          id: id,
        })
      )
    }
  }
  return (
    <>
      {modalOpen && (
        <div className="transition-height h-full w-full flex justify-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20">
          <div
            className="bg-bg-primary dark:bg-bg-primary-dark rounded-xl w-[90%] lg:w-[60%] xl:w-[40%] h-min z-30 p-8 relative top-[15%]"
            ref={modalRef}
            aria-hidden="true"
          >
            <form
              className="flex flex-col items-center gap-6 text-center"
              onSubmit={handleSubmit}
              aria-modal="true"
              role="dialog"
            >
              <h2 className="text-xl">{movie.title}</h2>
              <StarRating rating={rating} setRating={setRating} />
              <div className="grid gap-2 w-full text-left">
                <textarea
                  placeholder="Write your review for the movie here"
                  className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
                  rows={6}
                  defaultValue={review}
                  onChange={(event) => setReview(event.target.value)}
                />
                <p
                  className={`text-error font-semibold ${
                    error ? 'block' : 'hidden'
                  }`}
                >
                  Review Cannot be Empty
                </p>
              </div>
              <button
                className="rounded w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-3"
                type="submit"
              >
                Submit {userReview ? 'Edit' : 'Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewModal
