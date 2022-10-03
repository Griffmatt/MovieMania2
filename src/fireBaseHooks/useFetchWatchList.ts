import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase'
import { Imovie } from '../typescript/interfaces/movie'
import { Iuser } from '../typescript/interfaces/user'

export const useFetchWatchList = () => {
  const userJSON = localStorage.getItem('user')
  const user = JSON.parse(userJSON) as Iuser
  const fetchWatchList = async () => {
    if (user === null) return user
    const docRef = doc(db, 'watch-list', user.uid)
    const watchListDoc = await getDoc(docRef)
    const watchListData = watchListDoc.data() as { watchList: Imovie[] }

    return watchListData.watchList ?? null
  }

  const { data, isLoading } = useQuery(['watch-list', user], fetchWatchList)

  const watchList = data
  const isLoadingWatchList = isLoading

  return { watchList, isLoadingWatchList }
}
