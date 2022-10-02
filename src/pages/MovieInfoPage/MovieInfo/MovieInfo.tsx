import Crew from './Crew'
import Cast from './Cast'
import Genres from '../../../components/Genres'

import { formatMoney } from '../../../utils/formatMoney'
import { Imovie } from '../../../typescript/interfaces/movie'
import WatchListButton from './WatchListButton'
import ReviewButton from './ReviewButton'
import ReviewModal from './ReviewModal'
import { useQuery } from '@tanstack/react-query'
import { fetchReview } from '../../../fireBaseUtils/fetchReview'
import { useUserContext } from '../../../context/userContext'

interface Props {
  movie: Imovie
}

function MovieInfo({ movie }: Props) {
  const { user } = useUserContext()
  const { data } = useQuery(
    ['review', movie.title],
    () => user && fetchReview(movie, user)
  )
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
      <div className="flex gap-2 flex-wrap">
        <Genres genres={genres} />
      </div>
      <div className="flex justify-between flex-col gap-2 md:flex-row">
        <h4>
          {movie.release_date.slice(0, 4)} - {runTime(runtime)} -{' '}
          <span className="infoRating">
            {Math.trunc(vote_average * 10)}
            <span className="text-sm">%</span>
          </span>
        </h4>
        <div className="flex flex-col sm:flex-row gap-4">
          <WatchListButton movie={movie} />
          <ReviewButton />
          <ReviewModal movie={movie} userReview={data} />
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
