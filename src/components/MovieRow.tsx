import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'

import { Imovie } from '../typescript/interfaces/movie'
import MoviePoster from './MoviePoster'

function MovieRow({ movies }: { movies: Imovie[] }) {
  const [moviesRef] = useAutoAnimate<HTMLDivElement>()

  return (
    <div className="movieRowContainer">
      <div className="movieRowGrid" ref={moviesRef}>
        {movies.map((movie: Imovie) => {
          return (
            <React.Fragment key={movie.id}>
              <MoviePoster movie={movie} posterSize="300" />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default MovieRow
