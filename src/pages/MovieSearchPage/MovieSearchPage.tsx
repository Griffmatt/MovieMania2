import MovieRow from '../../components/MovieGrid'
import requests from '../../shared/requests'
import { Imovie } from '../../typescript/interfaces/movie'

import useFetchMovies from '../../hooks/useFetchMovies'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'

function MovieSearchPage() {
  const { value } = useParams()
  const navigate = useNavigate()

  let timer: string | number | NodeJS.Timeout | undefined
  const request = value
    ? `${requests.fetchSearch}${value}`
    : `${requests.fetchPopular}`

  const { movies, loading } = useFetchMovies<Imovie[]>(request)

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => handleChange(value), 1000)
  }

  const handleChange = (value: string) => {
    if (!value) return
    navigate(`/search/q=${value}`)
  }

  return (
    <>
      <div className="w-full h-fit sticky top-0  bg-bg-primary dark:bg-bg-primary-dark border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
        <div className="p-3 flex gap-5 items-center md:w-2/5">
          <BackButton />
          <input
            key={value}
            type="search"
            placeholder="Search"
            defaultValue={value}
            className="search-bar"
            onChange={(event) => debounce(event.target.value)}
          />
        </div>
      </div>
      <div className="border-t-2 border-bg-secondary dark:border-bg-secondary-dark">
        {loading ? <div>Loading</div> : movies && <MovieRow movies={movies} />}
      </div>
    </>
  )
}

export default MovieSearchPage
