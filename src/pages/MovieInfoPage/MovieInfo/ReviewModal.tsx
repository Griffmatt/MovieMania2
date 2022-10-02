import { useState, useEffect, SyntheticEvent } from 'react'
import { useUserContext } from '../../../context/userContext'

import { Imovie } from '../../../typescript/interfaces/movie'

import { useModalContext } from '../../../context/modalContext'

import StarRating from './StarRating'
import { v4 as uuidv4 } from 'uuid'
import Modal from '../../../components/ui/Modal'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import db from '../../../firebase'
import { Ireview } from '../../../typescript/interfaces/review'
import Review from '../../../components/Review'

interface Props {
  movie: Imovie
  userReview?: Ireview | null
}

function ReviewModal({ movie, userReview }: Props) {
  const [rating, setRating] = useState<number>(
    userReview ? userReview.rating : 5
  )
  const [review, setReview] = useState<string>(
    userReview ? userReview.review : ''
  )
  const [error, setError] = useState(false)

  const { isOpenReview, closeModal } = useModalContext()

  const { user } = useUserContext()

  useEffect(() => {
    setError(false)
  }, [isOpenReview])

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user === null) return
    const docRef = doc(db, 'reviews', user.uid)
    const reviewObj = {
      movieId: movie.id,
      title: movie.title,
      name: user.name,
      userName: user.userName,
      date: new Date().toLocaleDateString(),
      rating: rating,
      review: review,
      id: uuidv4(),
    }
    const updateReviewDoc = async () => {
      await updateDoc(docRef, {
        reviews: arrayUnion(reviewObj),
      })
      closeModal()
    }
    void updateReviewDoc()
  }

  const deleteReview = () => {
    const updateReviewDoc = async () => {
      if (user === null) return
      const docRef = doc(db, 'reviews', user.uid)
      await updateDoc(docRef, {
        reviews: arrayRemove(userReview),
      })
      closeModal()
    }
    void updateReviewDoc()
  }

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    closeModal()
  }

  return (
    <>
      {isOpenReview && (
        <Modal title={movie.title}>
          {userReview ? (
            <div className="flex flex-col gap-3">
              <Review review={userReview} />
              <button
                className="rounded-2xl w-full md:w-[50%] text-white font-semibold bg-primary py-3 col-start-2 place-self-end"
                onClick={deleteReview}
              >
                Delete Review
              </button>
            </div>
          ) : (
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
              <div className="grid grid-cols-2 gap-6 w-full">
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
          )}
        </Modal>
      )}
    </>
  )
}

export default ReviewModal
