import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Ireview } from '../typescript/interfaces/review'
import { Iuser } from '../typescript/interfaces/user'

export const useFetchUserReviews = () => {
  const userJSON = localStorage.getItem('user')
  const user = JSON.parse(userJSON) as Iuser
  const fetchUserReviews = async () => {
    if (user === null) return user
    const docRef = doc(db, 'reviews', user.uid)
    const reviewDoc = await getDoc(docRef)
    const reviewData = reviewDoc.data() as { reviews: Ireview[] }

    return reviewData.reviews ?? null
  }
  const { data, isLoading } = useQuery(['reviews', user], fetchUserReviews)
  const reviews = data
  const isLoadingReviews = isLoading

  return { reviews, isLoadingReviews }
}
