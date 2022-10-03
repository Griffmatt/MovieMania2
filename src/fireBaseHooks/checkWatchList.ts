import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Imovie } from '../typescript/interfaces/movie'
import { Iuser } from '../typescript/interfaces/user'

export const checkWatchList = async (id: string, user: Iuser | null) => {
  if (user === null) return user
  const docRef = doc(db, 'watch-list', user.uid)
  const watchListDoc = await getDoc(docRef)
  const watchListData = watchListDoc.data() as { watchList: Imovie[] }

  const isOn = watchListData.watchList.find(
    (watchListMovie) => watchListMovie.id === Number(id)
  )
  return isOn ? true : false
}
