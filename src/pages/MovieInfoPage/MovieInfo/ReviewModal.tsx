import { useEffect, useRef, useState, useId } from 'react'
import { addReview } from '../../../redux/reviewSlice'
import { useDispatch } from 'react-redux'
import { useUserContext } from '../../../context/userContext'
import { Imovie } from '../../../typescript/interfaces/movie'

import { useReviewModalContext } from '../../../context/reviewModalContext'

interface Props {
  movie: Imovie
}

function ReviewModal({ movie }: Props) {
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const outSideModalRef = useRef(null)

  const id = useId()

  const { modalOpen, handleOpenReviewModal } = useReviewModalContext()

  const { user } = useUserContext()

  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event: { target: Node | null }) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleOpenReviewModal()
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        handleOpenReviewModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef, handleOpenReviewModal])

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('modal-open')
    }

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [modalOpen])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
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
        <div
          className="h-full w-full flex justify-center items-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20"
          ref={outSideModalRef}
        >
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
              aria-labelledby="header"
            >
              <h2 className="text-xl">Reviewing: {movie.title}</h2>
              <input
                type="text"
                placeholder="rating out of 10 here"
                className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded"
                onChange={(event) => setRating(Number(event.target.value))}
              />
              <textarea
                placeholder="Write your review for the movie here"
                className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded h-[30%] resize-none"
                onChange={(event) => setReview(event.target.value)}
              />
              <button
                className="rounded w-[90%] text-white bg-primary hover:bg-primary/90 mx-auto py-3"
                type="submit"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ReviewModal
