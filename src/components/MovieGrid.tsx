import React from 'react'
import { Link } from 'react-router-dom'

import { Imovie } from '../typescript/interfaces/movie'
import MovieBanner from './MovieBanner'
import MoviePoster from './MoviePoster'

function MovieGrid({ movies }: { movies: Imovie[] }) {
  return (
    <div className="grid grid-cols-2 place-items-center gap-5 p-3 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie: Imovie, index) => {
        return (
          <React.Fragment key={movie.id}>
            <Link
              to={`/${movie.id}`}
              className={`${
                index === 0 ? 'col-span-full aspect-video' : 'aspect-[2/3]'
              } w-full`}
            >
              {index === 0 ? (
                <MovieBanner movie={movie} />
              ) : (
                <MoviePoster movie={movie} posterSize="300" />
              )}
            </Link>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default MovieGrid
