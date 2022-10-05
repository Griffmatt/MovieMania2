import { Imovie } from '../typescript/interfaces/movie'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import db from '../firebase'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../main'

export const useAddToWatchList = (movie: Imovie, userId?: string | null) => {
  const addToWatchList = async (value: boolean) => {
    if (userId == null) return
    const docRef = doc(db, 'watch-list', userId)
    await updateDoc(docRef, {
      watchList: arrayUnion(movie),
    })
    return value
  }

  const mutationAdd = useMutation(addToWatchList, {
    // When mutate is called:
    onMutate: async (value) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['on-watch-list', movie.id, userId])

      // Snapshot the previous value
      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
        userId,
      ]) as boolean
      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        userId,
      ]) as Imovie[]

      // Optimistically update to the new value
      queryClient.setQueryData(['on-watch-list', movie.id, userId], value)

      previousWatchList &&
        queryClient.setQueryData(
          ['watch-list', userId],
          [...previousWatchList, movie]
        )

      // Return a context with the previous and new todo
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
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries(['on-watch-list', movie.id, userId])
    },
  })

  return mutationAdd
}
