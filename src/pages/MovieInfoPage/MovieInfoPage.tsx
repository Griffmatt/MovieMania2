import MovieMedia from './MovieMedia'
import requests from '../../shared/requests'
import MoviePoster from '../../components/MoviePoster'
import MovieInfo from './MovieInfo/MovieInfo'

import { useParams } from 'react-router-dom'

import { reviews } from '../../shared/reviewsArray'

import { Imovie } from '../../typescript/interfaces/movie'
import { Ireview } from '../../typescript/interfaces/review'
import BackButton from '../../components/ui/BackButton'
import Review from '../../components/Review'

import { fetchMovies } from '../../utils/fetchMovies'
import { useQuery } from '@tanstack/react-query'

function MovieInfoPage() {
  const { id } = useParams()

  const { data, isLoading } = useQuery([id], () =>
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fetchMovies<Imovie>(`/movie/${id}${requests.fetchMovieInfo}`)
  )

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        data && (
          <div className="p-5 grid gap-3 ">
            <div className="items-start">
              <BackButton />
            </div>
            <div className="flex justify-center">
              <div className="w-60 md:w-[31.25rem] aspect-[2/3]">
                <MoviePoster movie={data} />
              </div>
            </div>
            <MovieInfo movie={data} />
            <MovieMedia
              images={data.images.backdrops}
              movie={data}
              videos={data.videos.results}
            />
            <div className="border-t-2 border-bg-secondary dark:border-bg-secondary-dark">
              <h2>Recent Reviews</h2>
              <div className="grid gap-5 w-full xl:grid-cols-2 py-4">
                {reviews.map((review: Ireview) => {
                  return (
                    <div
                      className="border-2 w-full border-bg-secondary dark:border-bg-secondary-dark p-5 rounded-xl shadow"
                      key={review.userId}
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

export default MovieInfoPage
