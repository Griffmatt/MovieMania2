import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Imovie } from '../typescript/interfaces/movie'
import { Iuser } from '../typescript/interfaces/user'

export const fetchWatchList = async (user: Iuser | null) => {
  if (user === null) return
  const docRef = doc(db, 'watch-list', user.uid)
  const watchListDoc = await getDoc(docRef)
  const watchListData = watchListDoc.data() as { watchList: Imovie[] }

  return watchListData.watchList ?? null
}
