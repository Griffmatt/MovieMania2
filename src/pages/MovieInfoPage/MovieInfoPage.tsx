import MovieMedia from './MovieMedia'
import Review from '../../components/Review'
import { reviews } from '../../shared/reviewsArray'
import requests from '../../shared/requests'
import MoviePoster from '../../components/MoviePoster'
import MovieInfo from './MovieInfo/MovieInfo'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useParams } from 'react-router-dom'

import { Imovie } from '../../typescript/interfaces/movie'
import { Ireview } from '../../typescript/interfaces/review'
import React from 'react'
import BackButton from '../../components/ui/BackButton'

function MovieInfoPage() {
  const { id } = useParams()
  const { movies, loading } = useFetchMovies<Imovie>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `/movie/${id}${requests.fetchMovieInfo}`
  )

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        movies && (
          <div className="p-8 grid gap-3 ">
            <div className="items-start">
              <BackButton />
            </div>
            <div className="flex justify-center">
              <MoviePoster movie={movies} posterSize="500" />
            </div>
            <MovieInfo movie={movies} />
            <MovieMedia
              images={movies.images.backdrops}
              movie={movies}
              videos={movies.videos.results}
            />
            <div className="border-t-2 dark:border-gray-700">
              <h2>Recent Reviews</h2>
              <div className="grid gap-5 xl:grid-cols-2 py-4">
                {reviews.map((review: Ireview) => {
                  return (
                    <React.Fragment key={review.id}>
                      <Review review={review} />
                    </React.Fragment>
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

export default MovieInfoPage
