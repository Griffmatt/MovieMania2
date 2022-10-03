import { Imovie } from '../../../typescript/interfaces/movie'
import { useUserContext } from '../../../context/userContext'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import db from '../../../firebase'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../main'
import { useEffect, useState } from 'react'

interface Props {
  movie: Imovie
  isOnWatchList?: boolean | null
}

function WatchListButton({ movie, isOnWatchList }: Props) {
  const { user } = useUserContext()
  const [isOn, setIsOn] = useState(isOnWatchList)
  useEffect(() => {
    setIsOn(isOnWatchList)
  }, [isOnWatchList])
  const addToWatchList = async (id: string) => {
    const docRef = doc(db, 'watch-list', id)
    const value = true
    await updateDoc(docRef, {
      watchList: arrayUnion(movie),
    })
    setIsOn(true)
    return value
  }

  const removeFromWatchList = async (id: string) => {
    const docRef = doc(db, 'watch-list', id)
    const value = false
    await updateDoc(docRef, {
      watchList: arrayRemove(movie),
    })
    setIsOn(false)
    return value
  }

  const mutationAdd = useMutation(addToWatchList, {
    // When mutate is called:
    onMutate: async (value) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['on-watch-list', movie.id])

      // Snapshot the previous value
      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
      ]) as boolean
      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        user,
      ]) as Imovie[]

      // Optimistically update to the new value
      queryClient.setQueryData(['on-watch-list', movie.id], value)

      previousWatchList &&
        queryClient.setQueryData(
          ['watch-list', user],
          [...previousWatchList, movie]
        )

      // Return a context with the previous and new todo
      return { previousOnWatchList, previousWatchList }
    },
    onSuccess: (value) => setIsOn(value),
    onError: (err, value, context) => {
      queryClient.setQueryData(
        ['on-watch-list', movie.id],
        context?.previousOnWatchList
      )
      queryClient.setQueryData(['watch-list', user], context?.previousWatchList)
    },
    // Always refetch after error or success:
    onSettled: () => {
      void queryClient.invalidateQueries(['on-watch-list', movie.id])
    },
  })
  const mutationRemove = useMutation(removeFromWatchList, {
    onMutate: async (value) => {
      await queryClient.cancelQueries(['on-watch-list', movie.id])

      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
      ]) as boolean

      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        user,
      ]) as Imovie[]

      queryClient.setQueryData(['on-watch-list', movie.id], value)
      previousWatchList &&
        queryClient.setQueryData(
          ['watch-list', user],
          previousWatchList.filter(
            (watchListMovie) => watchListMovie.id !== movie.id
          )
        )

      return { previousOnWatchList, previousWatchList }
    },
    onSuccess: (value) => setIsOn(value),
    onError: (err, value, context) => {
      queryClient.setQueryData(
        ['on-watch-list', movie.id],
        context?.previousOnWatchList
      )
      queryClient.setQueryData(['watch-list', user], context?.previousWatchList)
    },
    onSettled: () => {
      void queryClient.invalidateQueries(['on-watch-list', movie.id])
    },
  })

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user === null) return
    if (isOn) {
      mutationRemove.mutate(user.uid)
      return
    }
    mutationAdd.mutate(user.uid)
  }

  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>Watch List {isOn ? '-' : '+'}</h5>
    </button>
  )
}

export default WatchListButton
