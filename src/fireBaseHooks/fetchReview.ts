import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'

import { Iuser } from '../typescript/interfaces/user'

export const fetchReview = async (id: string, user: Iuser | null) => {
  if (user === null) return user
  const docRef = doc(db, 'reviews', user.uid)
  const reviewDoc = await getDoc(docRef)
  const reviewData = reviewDoc.data() as { reviews: Ireview[] }
  const review = reviewData.reviews.find(
    (review: Ireview) => review.movieId === Number(id)
  )
  return review ?? null
}
