import { Imovie } from '../../../typescript/interfaces/movie'
import { useUserContext } from '../../../context/userContext'
import { useQuery } from '@tanstack/react-query'
import { checkWatchList } from '../../../fireBaseUtils/checkWatchList'
import { useRemoveFromWatchList } from '../../../hooks/useRemoveFromWatchList'
import { useAddToWatchList } from '../../../hooks/useAddToWatchList'

interface Props {
  movie: Imovie
}

function WatchListButton({ movie }: Props) {
  const { userId } = useUserContext()

  const { data: isOnWatchList, isLoading } = useQuery(
    ['on-watch-list', movie.id, userId],
    () => checkWatchList(movie.id, userId)
  )

  const mutationAdd = useAddToWatchList(movie, userId)
  const mutationRemove = useRemoveFromWatchList(movie, userId)

  const handleClick = () => {
    if (userId == null) return
    console.log(isOnWatchList)
    if (isOnWatchList) {
      mutationRemove.mutate(false)
      return
    }
    mutationAdd.mutate(true)
  }

  if (isLoading) return <div className="movie-info__button animate-pulse" />

  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>Watch List {isOnWatchList ? '-' : '+'}</h5>
    </button>
  )
}

export default WatchListButton
