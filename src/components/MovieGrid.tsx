import { Link } from 'react-router-dom'

import { Imovie } from '../typescript/interfaces/movie'
import MoviePoster from './MoviePoster'

function MovieGrid({ movies }: { movies: Imovie[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2 md:gap-2 lg:grid-cols-4 lg:p-3 lg:gap-3">
      {movies.map((movie: Imovie) => {
        return (
          <Link
            to={`/${movie.id}`}
            className="rounded-xl bg-bg-secondary dark:bg-bg-secondary-dark aspect-[2/3] w-full"
            key={movie.id}
          >
            <MoviePoster movie={movie} posterSize="300" />
          </Link>
        )
      })}
    </div>
  )
}

export default MovieGrid
