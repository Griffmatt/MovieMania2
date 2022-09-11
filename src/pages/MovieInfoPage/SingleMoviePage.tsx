import MovieMedia from './MovieMedia'
import requests from '../../shared/requests'
import Reviews from './Reviews'
import MoviePoster from '../../components/MoviePoster'
import MovieInfo from './MovieInfo/MovieInfo'

import useFetchMovies from '../../hooks/useFetchMovies'

import { Imovie } from '../../typescript/interfaces/movie'

function MovieInfoPage({ id }: { id: string }) {
  const movie = useFetchMovies<Imovie>(`/movie/${id}${requests.fetchMovieInfo}`)

  return (
    <>
      {movie && (
        <div className="movieCardContainer">
          <div className="movieCardRow">
            <div className="movieCard">
              <MoviePoster movie={movie} posterSize="500" />
              <MovieInfo movie={movie} />
            </div>
            <MovieMedia
              images={movie.images.backdrops}
              movie={movie}
              videos={movie.videos.results}
            />
            <Reviews />
          </div>
        </div>
      )}
    </>
  )
}

export default MovieInfoPage
