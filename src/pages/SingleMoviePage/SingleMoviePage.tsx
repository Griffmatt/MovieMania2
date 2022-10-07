import { useParams } from 'react-router-dom'

import { Ireview } from '../../typescript/interfaces/review'

import BackButton from '../../components/ui/BackButton'
import Review from '../../components/Review'
import MoviePoster from '../../components/MoviePoster'
import Genres from '../../components/Genres'

import { formatMoney } from '../../utils/formatMoney'

import MovieMedia from './MovieInfoComponents/MovieMedia'
import WatchListButton from './MovieInfoComponents/WatchListButton'
import Crew from './MovieInfoComponents/Crew'
import Cast from './MovieInfoComponents/Cast'

import { fetchMovies } from '../../utils/fetchMovies'
import { Imovie } from '../../typescript/interfaces/movie'
import requests from '../../shared/requests'

import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../../components/ui/LoadingComponent'
import ReviewMovie from './ReviewMovie'

function SingleMoviePage() {
  const { movieId } = useParams()

  const { data: movie, isLoading: isLoadingMovies } = useQuery(
    ['movie', movieId],
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    () => fetchMovies<Imovie>(`/movie/${movieId}${requests.fetchMovieInfo}`)
  )

  const isLoading = isLoadingMovies

  const reviews = [] as Ireview[]

  const runTime = (runtime: number) =>
    runtime < 60
      ? `${runtime}m`
      : `${Math.trunc(runtime / 60)}h ${
          runtime - Math.trunc(runtime / 60) * 60
        }m`
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        movie && (
          <div className="p-5 grid gap-3">
            <div className="items-start">
              <BackButton />
            </div>
            <div className="mx-auto">
              <div className="w-60 md:w-[31.25rem] aspect-[2/3]">
                <MoviePoster movie={movie} posterSize="500" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h1 className="pt-3">{movie.title}</h1>
                <p>{movie.tagline}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Genres genres={movie.genres} />
              </div>
              <div className="flex justify-between flex-col gap-2 md:flex-row">
                <h4>
                  {movie.release_date.slice(0, 4)} - {runTime(movie.runtime)} -{' '}
                  <span className="infoRating">
                    {Math.trunc(movie.vote_average * 10)}
                    <span className="text-sm">%</span>
                  </span>
                </h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <WatchListButton movie={movie} />
                  <ReviewMovie movie={movie} />
                </div>
              </div>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <div className="grid py-3 border-t-2 border-bg-secondary dark:border-bg-secondary-dark md:grid-cols-3 md:text-center">
                <Crew crew={movie.credits.crew} />
                <div>
                  <h3>Budget</h3>
                  <p>{formatMoney(movie.budget)}</p>
                </div>
                <div>
                  <h3>Revenue</h3>
                  <p>{formatMoney(movie.revenue)}</p>
                </div>
              </div>
              <Cast cast={movie.credits.cast} />
            </div>
            <MovieMedia
              images={movie.images.backdrops}
              movie={movie}
              videos={movie.videos.results}
            />
            <div className="border-t-2 py-2 border-bg-secondary dark:border-bg-secondary-dark">
              <h2>Recent Reviews</h2>
              <div className="grid gap-5 w-full xl:grid-cols-2 py-4">
                {reviews.map((review: Ireview) => {
                  return (
                    <div
                      className="border-2 w-full border-bg-secondary dark:border-bg-secondary-dark p-5 rounded-xl shadow"
                      key={review.id}
                    >
                      <Review review={review} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      )}
    </>
  )
}

export default SingleMoviePage
