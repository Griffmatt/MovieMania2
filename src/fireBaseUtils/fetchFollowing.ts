import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'

export const fetchFollowing = async (userId?: string | null) => {
  if (userId == null) return null
  const docRef = doc(db, 'following', userId)
  const followingDoc = await getDoc(docRef)
  const followingData = followingDoc.data() as { following: string[] }
  return followingData.following ?? null
}
