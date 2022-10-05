import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton'

import { genres } from '../../shared/genres'
import Genres from '../../components/Genres'
import SearchResults from './SearchResults'

interface Props {
  request: string
}

function MovieSearchPage({ request }: Props) {
  const { value } = useParams()
  const fetchRequest = value ? `${request}${value}` : `${request}`

  const navigate = useNavigate()

  let timer: string | number | NodeJS.Timeout | undefined

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
      <nav className="top-0 sticky w-screen z-10 flex justify-between p-2 md:p-5 md:w-full bg-bg-primary dark:bg-bg-primary-dark border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
        <div className="flex gap-5 items-center md:w-3/5 lg:w-2/5">
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
      </nav>
      <div className="border-bg-secondary dark:border-bg-secondary-dark">
        <div className="pt-2 px-3 w-screen md:w-full overflow-x-scroll no-scrollbar flex gap-2 lg:flex-wrap lg:mx-auto">
          <Genres genres={genres} value={value} />
        </div>
        <SearchResults request={fetchRequest} value={value} />
      </div>
    </>
  )
}

export default MovieSearchPage
