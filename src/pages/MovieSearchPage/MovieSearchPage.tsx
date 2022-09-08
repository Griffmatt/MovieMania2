import { useState } from 'react'
import MovieRow from '../../components/MovieRow'
import requests from '../../shared/requests'
import { Imovie } from '../../typescript/interfaces/movie'


import useDebounce from '../../hooks/useDebounce'
import useFetchMovies from '../../hooks/useFetchMovies'


function MovieSearchPage() {
  const [searchFor, setSearchFor] = useState('a')
  const [searchValue, setSearchValue] = useState('a')

  useDebounce(() => setSearchFor(searchValue === ''? 'a': searchValue ), 700, [searchValue])

  const movies = useFetchMovies<Imovie[]>(`${requests.fetchSearch}${searchFor}`)

  return (
    <>
      <input
        type="search"
        placeholder="Search For a Movie..."
        className="searchBar"
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {movies && <MovieRow movies={movies} />}
    </>
  )
}

export default MovieSearchPage
