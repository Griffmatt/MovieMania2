import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'

export const fetchReview = async (userId: string | null, movieId?: string) => {
  if (userId === null) return userId
  const docRef = doc(db, 'reviews', userId)
  const reviewDoc = await getDoc(docRef)
  const reviewData = reviewDoc.data() as { reviews: Ireview[] }
  const review = reviewData.reviews.find(
    (review: Ireview) => review.movieId === Number(movieId)
  )
  return review ?? null
}
