import { useState } from 'react'
import MovieRow from '../../components/MovieRow'
import requests from '../../shared/requests'
import { useFetchMovies } from '../../hooks/fetchMovies'

import { Imovie } from '../../typescript/interfaces/movie'

function MovieSearchPage() {
  const [searchFor, setSearchFor] = useState('a')

  const movies = useFetchMovies<Imovie[]>(`${requests.fetchSearch}${searchFor}`)

  let timer: number

  const handleChange = (value: string) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      setSearchFor(value ? value : 'a')
    }, 700)
  }

  return (
    <>
      <input
        type="search"
        placeholder="Search For a Movie..."
        className="searchBar"
        onChange={(event) => handleChange(event.target.value)}
      />
      {movies && <MovieRow movies={movies} />}
    </>
  )
}

export default MovieSearchPage
