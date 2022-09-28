import Crew from './Crew'
import Cast from './Cast'
import Genres from './Genres'

import { formatMoney } from '../../../utils/formatMoney'
import { Imovie } from '../../../typescript/interfaces/movie'
import WatchListButton from './WatchListButton'
import ReviewButton from './ReviewButton'
import ReviewModal from './ReviewModal'
import { ReviewModalContextProvider } from '../../../context/reviewModalContext'

interface Props {
  movie: Imovie
}

function MovieInfo({ movie }: Props) {
  // eslint-disable-next-line prettier/prettier
  const {
    genres,
    credits,
    budget,
    revenue,
    vote_average,
    title,
    tagline,
    runtime,
  } = movie

  const runTime = (runtime: number) =>
    runtime < 60
      ? `${runtime}m`
      : `${Math.trunc(runtime / 60)}h ${
          runtime - Math.trunc(runtime / 60) * 60
        }m`

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="pt-3">{title}</h1>
        <p>{tagline}</p>
      </div>
      <Genres genres={genres} />
      <div className="flex justify-between flex-col gap-2 md:flex-row">
        <h4>
          {movie.release_date.slice(0, 4)} - {runTime(runtime)} -{' '}
          <span className="infoRating">
            {Math.trunc(vote_average * 10)}
            <span className="text-sm">%</span>
          </span>
        </h4>
        <div className="flex gap-4">
          <WatchListButton movie={movie} />
          <ReviewModalContextProvider>
            <ReviewButton movie={movie} />
            <ReviewModal movie={movie} />
          </ReviewModalContextProvider>
        </div>
      </div>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
      <div className="grid py-3 border-t-2 border-bg-secondary dark:border-bg-secondary-dark md:grid-cols-3 md:text-center">
        <Crew crew={credits.crew} />
        <div>
          <h3>Budget</h3>
          <p>{formatMoney(budget)}</p>
        </div>
        <div>
          <h3>Revenue</h3>
          <p>{formatMoney(revenue)}</p>
        </div>
      </div>
      <Cast cast={credits.cast} />
    </div>
  )
}

export default MovieInfo
