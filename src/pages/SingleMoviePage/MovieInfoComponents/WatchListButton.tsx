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

  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (userId == null) return
    if (isOnWatchList) {
      mutationRemove.mutate(false)
      return
    }
    mutationAdd.mutate(true)
  }

  return (
    <button className="movie-info__button" onClick={handleClick}>
      {!isLoading && <h5>Watch List {isOnWatchList ? '-' : '+'}</h5>}
    </button>
  )
}

export default WatchListButton
