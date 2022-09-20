import MovieRow from '../../components/MovieGrid'
import requests from '../../shared/requests'
import { Imovie } from '../../typescript/interfaces/movie'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useSearchContext } from '../../context/searchForContext'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'

function MovieSearchPage() {
  const { value } = useParams()
  console.log(value)
  const { setSearchFor } = useSearchContext()
  let timer: string | number | NodeJS.Timeout | undefined
  const navigate = useNavigate()

  const { movies, loading } = useFetchMovies<Imovie[]>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${requests.fetchSearch}${value}`
  )

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => handleChange(value), 1000)
  }

  const handleChange = (value: string) => {
    if (!value) return
    setSearchFor(value)
    navigate(`/search/value=${value}`)
  }

  return (
    <>
      <div className="p-5 flex gap-5 relative items-center">
        <BackButton />
        <input
          key={value}
          type="search"
          placeholder="Search For a Movie..."
          defaultValue={value}
          className="bg-gray-200 border-gray-300 text-sm rounded-lg w-2/5 focus:outline-none focus:border-blue-500 p-2.5 dark:bg-gray-900 lg:w-1/3"
          onChange={(event) => debounce(event.target.value)}
        />
      </div>
      <div className="border-t-2 dark:border-gray-700">
        {loading ? <div>Loading</div> : movies && <MovieRow movies={movies} />}
      </div>
    </>
  )
}

export default MovieSearchPage
