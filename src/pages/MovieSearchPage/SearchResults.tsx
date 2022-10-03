import MovieRow from '../../components/MovieGrid'
import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from '../../utils/fetchMovies'
import { Imovie } from '../../typescript/interfaces/movie'
import LoadingComponent from '../../components/ui/LoadingComponent'

interface Props {
  request: string
  value?: string
}

interface Data {
  results: Imovie[]
}

function SearchResults({ request, value }: Props) {
  const { data, isLoading } = useQuery(['movies', request], () =>
    fetchMovies<Data>(request)
  )
  if (isLoading) return <LoadingComponent />
  return (
    <>
      {data && (
        <>
          {data.results.length === 0 ? (
            <div className="flex justify-center py-10">
              <div className="bg-bg-secondary dark:bg-bg-secondary-dark p-3 md:py-10 rounded-2xl text-center grid gap-6 w-fit">
                <h3>No movies Were found for {value}</h3>
              </div>
            </div>
          ) : (
            <MovieRow movies={data.results} />
          )}
        </>
      )}
    </>
  )
}

export default SearchResults
