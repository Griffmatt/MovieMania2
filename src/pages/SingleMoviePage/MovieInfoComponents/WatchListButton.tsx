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
  const addToWatchList = async (data: { value: boolean; id: string }) => {
    const docRef = doc(db, 'watch-list', data.id)
    await updateDoc(docRef, {
      watchList: arrayUnion(movie),
    })
    setIsOn(true)
    return data
  }

  const removeFromWatchList = async (data: { value: boolean; id: string }) => {
    const docRef = doc(db, 'watch-list', data.id)
    await updateDoc(docRef, {
      watchList: arrayRemove(movie),
    })
    setIsOn(false)
    return data
  }

  const mutationAdd = useMutation(addToWatchList, {
    // When mutate is called:
    onMutate: async ({ value, id }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['on-watch-list', movie.id, id])

      // Snapshot the previous value
      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
        id,
      ]) as boolean
      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        user,
      ]) as Imovie[]

      // Optimistically update to the new value
      queryClient.setQueryData(['on-watch-list', movie.id, id], value)

      previousWatchList &&
        queryClient.setQueryData(
          ['watch-list', id],
          [...previousWatchList, movie]
        )

      // Return a context with the previous and new todo
      return { previousOnWatchList, previousWatchList }
    },
    onSuccess: ({ value }) => setIsOn(value),
    onError: (err, data, context) => {
      queryClient.setQueryData(
        ['on-watch-list', movie.id, data.id],
        context?.previousOnWatchList
      )
      queryClient.setQueryData(
        ['watch-list', data.id],
        context?.previousWatchList
      )
    },
    // Always refetch after error or success:
    onSettled: (data) => {
      void queryClient.invalidateQueries(['on-watch-list', movie.id, data?.id])
    },
  })
  const mutationRemove = useMutation(removeFromWatchList, {
    onMutate: async ({ value, id }) => {
      await queryClient.cancelQueries(['on-watch-list', movie.id, id])

      const previousOnWatchList = queryClient.getQueryData([
        'on-watch-list',
        movie.id,
        id,
      ]) as boolean

      const previousWatchList = queryClient.getQueryData([
        'watch-list',
        id,
      ]) as Imovie[]

      queryClient.setQueryData(['on-watch-list', movie.id, id], value)
      previousWatchList &&
        queryClient.setQueryData(
          ['watch-list', id],
          previousWatchList.filter(
            (watchListMovie) => watchListMovie.id !== movie.id
          )
        )

      return { previousOnWatchList, previousWatchList }
    },
    onSuccess: ({ value }) => setIsOn(value),
    onError: (err, data, context) => {
      queryClient.setQueryData(
        ['on-watch-list', movie.id, data.id],
        context?.previousOnWatchList
      )
      console.log('yes')
      queryClient.setQueryData(['watch-list', user], context?.previousWatchList)
    },
    onSettled: (data) => {
      void queryClient.invalidateQueries(['on-watch-list', movie.id, data?.id])
    },
  })

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user == null) return
    if (isOn) {
      mutationRemove.mutate({ value: false, id: user })
      return
    }
    mutationAdd.mutate({ value: true, id: user })
  }

  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>Watch List {isOn ? '-' : '+'}</h5>
    </button>
  )
}

export default WatchListButton
