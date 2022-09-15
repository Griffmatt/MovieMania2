import MovieMedia from './MovieMedia'
import requests from '../../shared/requests'
import Reviews from './Reviews'
import MoviePoster from '../../components/MoviePoster'
import MovieInfo from './MovieInfo/MovieInfo'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useParams } from 'react-router-dom'

import { Imovie } from '../../typescript/interfaces/movie'

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
          <div className="movieCardContainer">
            <div className="movieCardRow">
              <div className="movieCard">
                <MoviePoster movie={movies} posterSize="500" />
                <MovieInfo movie={movies} />
              </div>
              <MovieMedia
                images={movies.images.backdrops}
                movie={movies}
                videos={movies.videos.results}
              />
              <Reviews />
            </div>
          </div>
        )
      )}
    </>
  )
}

export default MovieInfoPage
