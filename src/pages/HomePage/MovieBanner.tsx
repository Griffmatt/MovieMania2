import React from 'react'
import { Link } from 'react-router-dom'
import requests from '../../shared/requests'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { Imovie } from '../../typescript/interfaces/movie'
import useFetchMovies from '../../hooks/useFetchMovies'

function MovieBanner() {
  const base_url = 'https://image.tmdb.org/t/p/original'

  const { movies } = useFetchMovies<Imovie[]>(requests.fetchPopular)

  return (
    <Carousel
      infiniteLoop={true}
      showStatus={false}
      autoPlay
      interval={10000}
      showArrows={false}
      transitionTime={500}
      showThumbs={false}
      key={movies as unknown as React.Key}
    >
      {movies?.slice(0, 5).map((movie: Imovie, index: number) => {
        return (
          <div className="movieBanner" key={index}>
            <div>
              <Link to={`/${movie.id}`}>
                <h1>{movie.title}</h1>
              </Link>
              <img
                src={`${base_url}${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
          </div>
        )
      })}
    </Carousel>
  )
}

export default MovieBanner
