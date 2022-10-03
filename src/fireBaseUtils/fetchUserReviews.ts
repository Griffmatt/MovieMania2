import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'

export const fetchUserReviews = async (userId: string | null) => {
  if (userId === null) return userId
  const docRef = doc(db, 'reviews', userId)
  const reviewDoc = await getDoc(docRef)
  const reviewData = reviewDoc.data() as { reviews: Ireview[] }

  return reviewData.reviews ?? null
}
