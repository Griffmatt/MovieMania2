import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'
import { Imovie } from '../typescript/interfaces/movie'
import { Iuser } from '../typescript/interfaces/user'

export const fetchReview = async (movie: Imovie, user: Iuser) => {
  if (user === null) return
  const docRef = doc(db, 'reviews', user.uid)
  const reviewDoc = await getDoc(docRef)
  const reviewData = reviewDoc.data() as { reviews: Ireview[] }

  return (
    reviewData.reviews.find((review: Ireview) => review.movieId === movie.id) ??
    null
  )
}
