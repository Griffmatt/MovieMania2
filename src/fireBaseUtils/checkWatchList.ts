import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Imovie } from '../typescript/interfaces/movie'

export const checkWatchList = async (
  movieId: number,
  userId?: string | null
) => {
  if (userId == null) return null
  const docRef = doc(db, 'watch-list', userId)
  const watchListDoc = await getDoc(docRef)
  const watchListData = watchListDoc.data() as { watchList: Imovie[] }

  const isOn = watchListData.watchList.find(
    (watchListMovie) => watchListMovie.id === Number(movieId)
  )
  return isOn ? true : false
}
