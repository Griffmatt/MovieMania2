import Crew from './Crew'
import Cast from './Cast'
import Genres from './Genres'

import { formatMoney } from '../../../utils/formatMoney'
import { Imovie } from '../../../typescript/interfaces/movie'

interface Props {
  movie: Imovie
}

function MovieInfo({ movie }: Props) {
  const runTime = (runtime: number) =>
    runtime < 60
      ? `${runtime}m`
      : `${Math.trunc(runtime / 60)}h ${
          runtime - Math.trunc(runtime / 60) * 60
        }m`

  return (
    <div className="flex flex-col gap-3">
      <h2 className="py-3">{movie.title}</h2>
      <Genres movie={movie} />
      <div className="flex justify-between flex-col gap-2 md:flex-row">
        <h5>
          {movie.release_date.slice(0, 4)} - {runTime(movie.runtime)} -{' '}
          <span className="infoRating">
            {Math.trunc(movie.vote_average * 10)}
            <span className="text-sm">%</span>
          </span>
        </h5>
        <div className="flex gap-4">
          <button className="py-2 px-6 rounded bg-gray-300 dark:bg-gray-700">
            Watch List +
          </button>
          <button className="py-2 px-4 rounded bg-gray-300 dark:bg-gray-700">
            Add Review
          </button>
        </div>
      </div>
      <h4>Overview</h4>
      <p>{movie.overview}</p>
      <div className="grid py-3 border-t-2 dark:border-gray-700 md:grid-cols-3">
        <Crew crew={movie.credits.crew} />
        <div>
          <h4>Budget</h4>
          <p>{formatMoney(movie.budget)}</p>
        </div>
        <div>
          <h4>Revenue</h4>
          <p>{formatMoney(movie.revenue)}</p>
        </div>
      </div>
      <Cast cast={movie.credits.cast} />
    </div>
  )
}

export default MovieInfo
