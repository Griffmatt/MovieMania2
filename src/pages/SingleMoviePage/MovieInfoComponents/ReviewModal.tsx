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
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'

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

  const updateReviewDoc = async (data: { review: Ireview; id: string }) => {
    const docRef = doc(db, 'reviews', data.id)
    await updateDoc(docRef, {
      reviews: arrayRemove(userReview),
    })
    await updateDoc(docRef, {
      reviews: arrayUnion(data.review),
    })
    console.log(data.review)
    return data
  }

  const mutation = useMutation(updateReviewDoc, {
    // When mutate is called:
    onMutate: async ({ review }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['reviews', user])

      // Snapshot the previous value
      const previousReviews = queryClient.getQueryData([
        'reviews',
        user,
      ]) as Ireview[]

      // Optimistically update to the new value
      console.log(queryClient.getQueryData(['reviews', user]))
      previousReviews &&
        userReview &&
        queryClient.setQueryData(
          ['reviews', user],
          [
            ...previousReviews.filter((review) => review.id !== userReview.id),
            review,
          ]
        )
      previousReviews &&
        !userReview &&
        queryClient.setQueryData(
          ['reviews', user],
          [...previousReviews, review]
        )
      // Return a context with the previous and new todo
      return { previousReviews }
    },
    onError: (err, value, context) => {
      queryClient.setQueryData(['reviews', user], context?.previousReviews)
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries(['reviews', user])
      closeModal()
    },
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user === null) return
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

    mutation.mutate({ review: reviewObj, id: user.uid })
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
        </Modal>
      )}
    </>
  )
}

export default ReviewModal
