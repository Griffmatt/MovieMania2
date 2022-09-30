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
        <div className="pt-4 pb-2 px-4 w-screen lg:w-full overflow-x-scroll no-scrollbar flex gap-2 lg:flex-wrap lg:mx-auto">
          <Genres genres={genres} value={value} />
        </div>
        <SearchResults request={fetchRequest} value={value} />
      </div>
    </>
  )
}

export default MovieSearchPage
