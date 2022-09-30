import MovieRow from '../../components/MovieGrid'
import { Imovie } from '../../typescript/interfaces/movie'
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'

import { genres } from '../../shared/genres'
import Genres from '../../components/Genres'
import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../../utils/fetchMovies'

interface Props {
  request: string
}

interface Data {
  results: Imovie[]
}

function MovieSearchPage({ request }: Props) {
  const { value } = useParams()
  const navigate = useNavigate()

  let timer: string | number | NodeJS.Timeout | undefined
  const fetchRequest = value ? `${request}${value}` : `${request}`

  const { data } = useQuery(['movies', fetchRequest], () =>
    fetchMovies<Data>(fetchRequest)
  )

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => handleChange(value), 1000)
  }

  const handleChange = (value: string) => {
    if (!value) return
    navigate(`/search/q=${value}`)
  }

  const findDefaultValue = () => {
    for (let i = 0; i < genres.length; i++) {
      if (genres[i].id === Number(value)) {
        return
      }
    }
    return value
  }
  return (
    <>
      {data && (
        <>
          <div className="w-full h-fit sticky top-0  bg-bg-primary dark:bg-bg-primary-dark border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
            <div className="p-3 md:p-5 flex gap-5 items-center md:w-2/5">
              <BackButton />
              <input
                key={value}
                type="search"
                placeholder="Search"
                defaultValue={findDefaultValue()}
                className="search-bar"
                onChange={(event) => debounce(event.target.value)}
              />
            </div>
          </div>
          <div className="border-bg-secondary dark:border-bg-secondary-dark">
            <div className="pt-4 pb-2 px-4 w-screen lg:w-full overflow-x-scroll no-scrollbar flex gap-2 lg:flex-wrap lg:mx-auto lg:justify-center">
              <Genres genres={genres} value={value} />
            </div>
            {data.results.length === 0 ? (
              <div className="flex justify-center py-10">
                <div className="bg-bg-secondary dark:bg-bg-secondary-dark p-3 md:py-10 rounded-2xl text-center grid gap-6 w-fit">
                  <h3>No movies Were found for {value}</h3>
                </div>
              </div>
            ) : (
              <MovieRow movies={data.results} />
            )}
          </div>
        </>
      )}
    </>
  )
}

export default MovieSearchPage
