import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Imovie } from '../typescript/interfaces/movie'
import MoviePoster from './MoviePoster'

function MovieRow({ movies }: { movies: Imovie[] }) {

  const [moviesRef] = useAutoAnimate<HTMLDivElement>()

  
  return (
    <div className="movieRowContainer">
      <div className="movieRowGrid" ref={moviesRef}>
        {movies.map((movie: Imovie) => {
          return (
              <MoviePoster movie={movie} posterSize="300" />
          )
        })}
      </div>
    </div>
  )
}

export default MovieRow
