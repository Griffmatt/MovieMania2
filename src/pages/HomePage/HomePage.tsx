import { useState, useEffect, useRef } from 'react'
import requests from '../../shared/requests'
import MovieGrid from '../../components/MovieGrid'

import { movieOptions } from '../../shared/movieOptions'

import { Imovie } from '../../typescript/interfaces/movie'

import { fetchMovies } from '../../utils/fetchMovies'
import { useQuery } from '@tanstack/react-query'

interface Data {
  results: Imovie[]
}

function HomePage() {
  const [request] = useState('upcoming')

  const { data } = useQuery([request], () =>
    fetchMovies<Data>(`/movie/${request}${requests.fetchMovies}`)
  )

  const optionMap = useRef(new Map<string, string>())

  useEffect(() => {
    movieOptions.forEach((option: { name: string; value: string }) => {
      optionMap.current.set(option.value, option.name)
    })
  }, [])

  return <>{data && <MovieGrid movies={data.results} />}</>
}

export default HomePage
