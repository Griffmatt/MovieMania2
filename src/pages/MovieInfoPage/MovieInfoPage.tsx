import MovieMedia from './MovieMedia'
import requests from '../../shared/requests'
import MoviePoster from '../../components/MoviePoster'
import MovieInfo from './MovieInfo/MovieInfo'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useParams } from 'react-router-dom'

import { reviews } from '../../shared/reviewsArray'

import { Imovie } from '../../typescript/interfaces/movie'
import { Ireview } from '../../typescript/interfaces/review'
import React from 'react'
import BackButton from '../../components/ui/BackButton'
import Review from '../../components/Review'

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
          <div className="p-5 grid gap-3 ">
            <div className="items-start">
              <BackButton />
            </div>
            <div className="flex justify-center">
              <div className="w-60 md:w-[31.25rem] aspect-[2/3]">
                <MoviePoster movie={movies} />
              </div>
            </div>
            <MovieInfo movie={movies} />
            <MovieMedia
              images={movies.images.backdrops}
              movie={movies}
              videos={movies.videos.results}
            />
            <div className="border-t-2 border-bg-secondary dark:border-bg-secondary-dark">
              <h2>Recent Reviews</h2>
              <div className="grid gap-5 w-full xl:grid-cols-2 py-4">
                {reviews.map((review: Ireview) => {
                  return (
                    <React.Fragment key={review.userId}>
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
