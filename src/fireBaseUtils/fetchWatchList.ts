import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Imovie } from '../typescript/interfaces/movie'

export const fetchWatchList = async (userId: string | null) => {
  if (userId === null) return userId
  const docRef = doc(db, 'watch-list', userId)
  const watchListDoc = await getDoc(docRef)
  const watchListData = watchListDoc.data() as { watchList: Imovie[] }

  return watchListData.watchList ?? null
}
