import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'

interface WatchListMovie {
  id: string
  title: string
  poster_path: string
}

export const fetchWatchList = async (userId: string | null) => {
  if (userId === null) return userId
  const docRef = doc(db, 'watch-list', userId)
  const watchListDoc = await getDoc(docRef)
  const watchListData = watchListDoc.data() as { watchList: WatchListMovie[] }

  return watchListData.watchList ?? null
}
