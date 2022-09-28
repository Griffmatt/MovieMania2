import { useRef, useState, useId } from 'react'
import { addReview, updateReview } from '../../../redux/reviewSlice'
import { useDispatch } from 'react-redux'
import { useUserContext } from '../../../context/userContext'
import { useSelector } from 'react-redux'
import { selectReview } from '../../../redux/reviewSlice'

import { Imovie } from '../../../typescript/interfaces/movie'

import { useReviewModalContext } from '../../../context/reviewModalContext'
import useCloseModal from '../../../hooks/useCloseModal'

import { Ireview } from '../../../typescript/interfaces/review'

interface Props {
  movie: Imovie
}

function ReviewModal({ movie }: Props) {
  const reviews = useSelector(selectReview)

  const userReview: Ireview | undefined = reviews.find(
    (review) => review.movieId === movie.id
  )
  const [rating, setRating] = useState<number | null>(
    userReview?.rating ?? null
  )
  const [review, setReview] = useState(userReview?.review ?? '')
  const modalRef = useRef<HTMLDivElement>(null)

  const id = useId()

  const { modalOpen, handleOpenReviewModal } = useReviewModalContext()

  const { user } = useUserContext()

  useCloseModal(modalRef, handleOpenReviewModal, modalOpen)

  const dispatch = useDispatch()

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (userReview && rating) {
      handleOpenReviewModal()
      dispatch(
        updateReview({ review: review, rating: rating, id: userReview.id })
      )
      return
    }
    if (rating && review !== '') {
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
        <div className="h-full w-full flex justify-center items-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20">
          <div
            className=" bg-bg-primary dark:bg-bg-primary-dark rounded-xl w-[90%] lg:w-[30%] aspect-square lg:aspect-[2/1] z-30"
            ref={modalRef}
            aria-hidden="true"
          >
            <form
              className="flex flex-col justify-between p-6 h-full"
              onSubmit={handleSubmit}
              aria-modal="true"
              role="dialog"
            >
              <h2 className="text-xl">
                {userReview ? 'Editing review for:' : 'Reviewing:'}{' '}
                {movie.title}
              </h2>
              <input
                type="text"
                placeholder="rating out of 10 here"
                className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded"
                defaultValue={userReview ? userReview.rating : ''}
                onChange={(event) => setRating(Number(event.target.value))}
              />
              <textarea
                placeholder="Write your review for the movie here"
                className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded h-[30%] resize-none"
                defaultValue={userReview ? userReview.review : ''}
                onChange={(event) => setReview(event.target.value)}
              />
              <button
                className="rounded w-[90%] text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-3"
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
