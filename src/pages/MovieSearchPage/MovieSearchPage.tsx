import { useState } from 'react'
import MovieRow from '../../components/MovieRow'
import requests from '../../shared/requests'
import { Imovie } from '../../typescript/interfaces/movie'

import useFetchMovies from '../../hooks/useFetchMovies'

function MovieSearchPage() {
  const [searchFor, setSearchFor] = useState('a')

  let timer: string | number | NodeJS.Timeout | undefined

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => setSearchFor(value === '' ? 'a' : value), 1000)
  }

  const { movies, loading } = useFetchMovies<Imovie[]>(
    `${requests.fetchSearch}${searchFor}`
  )

  return (
    <>
      <input
        type="search"
        placeholder="Search For a Movie..."
        className="searchBar"
        onChange={(event) => debounce(event.target.value)}
      />
      {loading ? <div>Loading</div> : movies && <MovieRow movies={movies} />}
    </>
  )
}

export default MovieSearchPage
