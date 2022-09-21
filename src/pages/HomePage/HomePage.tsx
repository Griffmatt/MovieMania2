import { useState, useEffect, useRef } from 'react'
import requests from '../../shared/requests'
import MovieGrid from '../../components/MovieGrid'

import useFetchMovies from '../../hooks/useFetchMovies'
import { movieOptions } from '../../shared/movieOptions'

import { Imovie } from '../../typescript/interfaces/movie'

function HomePage() {
  const [request] = useState('upcoming')

  const { movies } = useFetchMovies<Imovie[]>(
    `/movie/${request}${requests.fetchMovies}`
  )

  const optionMap = useRef(new Map<string, string>())

  useEffect(() => {
    movieOptions.forEach((option: { name: string; value: string }) => {
      optionMap.current.set(option.value, option.name)
    })
  }, [])

  return <>{movies && <MovieGrid movies={movies} />}</>
}

export default HomePage
