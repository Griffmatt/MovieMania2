import React from 'react'
import { Link } from 'react-router-dom'

import { Imovie } from '../typescript/interfaces/movie'
import MovieBanner from './MovieBanner'
import MoviePoster from './MoviePoster'

function MovieGrid({ movies }: { movies: Imovie[] }) {
  return (
    <div className="grid grid-cols-4 place-items-center gap-5 p-3">
      {movies.map((movie: Imovie, index) => {
        return (
          <React.Fragment key={movie.id}>
            {index === 0 ? (
              <Link to={`/${movie.id}`} className="col-span-4">
                <MovieBanner movie={movie} />
              </Link>
            ) : (
              <Link to={`/${movie.id}`}>
                <MoviePoster movie={movie} posterSize="300" />
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default MovieGrid
