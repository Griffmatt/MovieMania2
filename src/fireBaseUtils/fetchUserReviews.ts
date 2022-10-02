import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'
import { Iuser } from '../typescript/interfaces/user'

export const fetchUserReviews = async (user: Iuser | null) => {
  if (user === null) return
  const docRef = doc(db, 'reviews', user.uid)
  const reviewDoc = await getDoc(docRef)
  const reviewData = reviewDoc.data() as { reviews: Ireview[] }

  return reviewData.reviews ?? null
}
