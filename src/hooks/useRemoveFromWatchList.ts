import { Imovie } from '../typescript/interfaces/movie'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import db from '../firebase'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'

export const useRemoveFromWatchList = (
  movie: Imovie,
  userId?: string | null
) => {
  const removeFromWatchList = async (value: boolean) => {
    if (userId == null) return
    const docRef = doc(db, 'watch-list', userId)
    await updateDoc(docRef, {
      watchList: arrayRemove({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
      }),
    })
    return value
  }

  const mutationRemove = useMutation(removeFromWatchList, {
    onMutate: async (value) => {
      await queryClient.cancelQueries(['on-watch-list', movie.id, userId])

      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
        userId,
      ]) as boolean

      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        userId,
      ]) as { watchList: Imovie[] }
      console.log(previousWatchList)

      queryClient.setQueryData(['on-watch-list', movie.id, userId], value)

      previousWatchList &&
        queryClient.setQueryData(['watch-list', userId], {
          watchList: previousWatchList.watchList.filter(
            (watchListMovie) => watchListMovie.id !== movie.id
          ),
        })

      return { previousOnWatchList, previousWatchList }
    },
    onError: (err, value, context) => {
      queryClient.setQueryData(
        ['on-watch-list', movie.id, userId],
        context?.previousOnWatchList
      )
      queryClient.setQueryData(
        ['watch-list', userId],
        context?.previousWatchList
      )
    },
    onSettled: () => {
      console.log('e')
      void queryClient.invalidateQueries(['on-watch-list', movie.id, userId])
      void queryClient.invalidateQueries(['watch-list', userId])
    },
  })

  return mutationRemove
}
