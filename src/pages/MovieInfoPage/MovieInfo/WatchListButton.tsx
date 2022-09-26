import { useSelector, useDispatch } from 'react-redux'
import {
  selectWatchList,
  addMovie,
  removeMovie,
} from '../../../redux/watchListSlice'
import { Imovie } from '../../../typescript/interfaces/movie'

function WatchListButton({ movie }: { movie: Imovie }) {
  const dispatch = useDispatch()
  const watchListMovies = useSelector(selectWatchList)
  const movieIds = watchListMovies.map((movie) => movie.id)
  const includesMovie = movieIds.includes(movie.id)

  const handleClick = () => {
    includesMovie ? dispatch(removeMovie(movie)) : dispatch(addMovie(movie))
  }
  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>
        Watch List{' '}
        <span className="text-xl">{`${includesMovie ? '-' : '+'}`}</span>
      </h5>
    </button>
  )
}

export default WatchListButton
