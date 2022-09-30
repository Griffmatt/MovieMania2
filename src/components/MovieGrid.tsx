import { Link } from 'react-router-dom'

import { Imovie } from '../typescript/interfaces/movie'
import MovieBanner from './MovieBanner'
import MoviePoster from './MoviePoster'

function MovieGrid({ movies }: { movies: Imovie[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie: Imovie, index) => {
        return (
          <Link
            to={`/${movie.id}`}
            className={`rounded-xl bg-bg-secondary dark:bg-bg-secondary-dark ${
              index === 0 && movie.backdrop_path
                ? 'col-span-full aspect-video'
                : 'aspect-[2/3]'
            } w-full`}
            key={movie.id}
          >
            {index === 0 && movie.backdrop_path ? (
              <MovieBanner movie={movie} />
            ) : (
              <MoviePoster movie={movie} />
            )}
          </Link>
        )
      })}
    </div>
  )
}

export default MovieGrid
