import MovieRow from '../../components/MovieGrid'
import requests from '../../shared/requests'
import { Imovie } from '../../typescript/interfaces/movie'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useSearchContext } from '../../context/searchForContext'

import { useParams } from 'react-router-dom'

function MovieSearchPage() {
  const { value } = useParams()
  const { searchFor } = useSearchContext()
  const { movies, loading } = useFetchMovies<Imovie[]>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${requests.fetchSearch}${value ?? searchFor}`
  )
  return (
    <>{loading ? <div>Loading</div> : movies && <MovieRow movies={movies} />}</>
  )
}

export default MovieSearchPage
