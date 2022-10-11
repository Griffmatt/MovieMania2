import { useState, useEffect, SyntheticEvent } from 'react'
import { useUserContext } from '../../../context/userContext'

import { Imovie } from '../../../typescript/interfaces/movie'

import { useModalContext } from '../../../context/modalContext'

import StarRating from './StarRating'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../../../components/ui/Modal'
import { Ireview } from '../../../typescript/interfaces/review'
import { useAddReview } from '../../../hooks/useAddReview'

interface Props {
  movie: Imovie
  userReview?: Ireview | null
}

function ReviewModal({ movie, userReview }: Props) {
  const { isOpenReview, closeModal } = useModalContext()
  const { userId, userData } = useUserContext()

  const [rating, setRating] = useState<number>(
    userReview ? userReview.rating : 5
  )
  const [review, setReview] = useState<string>(
    userReview ? userReview.review : ''
  )
  const [error, setError] = useState(false)

  const mutation = useAddReview(movie, userId, userReview)

  useEffect(() => {
    setError(false)
  }, [isOpenReview])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    closeModal()
    if (userId == null) return null
    if (userData == null) return null
    const reviewObj = {
      movieId: movie.id,
      title: movie.title,
      name: userData.name,
      userName: userData.userName,
      date: new Date().toLocaleString(),
      time: new Date().getTime(),
      rating: rating,
      review: review,
      id: uuidv4(),
      uid: userId,
    }

    mutation.mutate(reviewObj)
  }

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    closeModal()
  }

  return (
    <>
      {isOpenReview && (
        <Modal title={movie.title}>
          <form
            className="flex flex-col items-center gap-6 text-center"
            onSubmit={handleSubmit}
            aria-modal="true"
            role="dialog"
          >
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
            <div className="grid grid-cols-2 gap-2 md:gap-6 w-full">
              <button
                className="rounded-2xl w-full md:w-[50%] font-semibold py-3 bg-bg-secondary dark:bg-bg-secondary-dark place-self-start"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="rounded-2xl w-full md:w-[50%] text-white font-semibold bg-primary py-3 col-start-2 place-self-end"
                type="submit"
              >
                Submit {userReview ? 'Edit' : 'Review'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default ReviewModal
