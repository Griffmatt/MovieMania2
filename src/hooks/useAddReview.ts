import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'
import { Imovie } from '../typescript/interfaces/movie'

export const useAddReview = (
  movie: Imovie,
  userId?: string | null,
  userReview?: Ireview | null
) => {
  const updateReviewDoc = async (review: Ireview) => {
    if (userId == null) return null
    const docRef = doc(db, 'reviews', userId)
    await updateDoc(docRef, {
      reviews: arrayRemove(userReview),
    })
    await updateDoc(docRef, {
      reviews: arrayUnion(review),
    })
    console.log(review)
    return review
  }

  const mutation = useMutation(updateReviewDoc, {
    // When mutate is called:
    onMutate: async (review) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['reviews', userId])
      await queryClient.cancelQueries(['review', movie.id, userId])

      // Snapshot the previous value
      const previousReviews = queryClient.getQueryData([
        'reviews',
        userId,
      ]) as Ireview[]

      const previousReview = queryClient.getQueryData([
        'review',
        movie.id,
        userId,
      ]) as Ireview

      // Optimistically update to the new value
      queryClient.setQueryData(['review', movie.id, userId], review)

      previousReviews &&
        userReview &&
        queryClient.setQueryData(
          ['reviews', userId],
          [
            ...previousReviews.filter((review) => review.id !== userReview.id),
            review,
          ]
        )
      previousReviews &&
        !userReview &&
        queryClient.setQueryData(
          ['reviews', userId],
          [...previousReviews, review]
        )
      // Return a context with the previous and new todo
      return { previousReviews, previousReview }
    },
    onError: (err, review, context) => {
      queryClient.setQueryData(['reviews', userId], context?.previousReviews)
      queryClient.setQueryData(
        ['review', movie.id, userId],
        context?.previousReview
      )
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries(['reviews', userId])
      void queryClient.invalidateQueries(['review', movie.id, userId])
    },
  })

  return mutation
}
