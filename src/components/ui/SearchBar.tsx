import { useSearchContext } from '../../context/searchForContext'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const { setSearchFor } = useSearchContext()
  let timer: string | number | NodeJS.Timeout | undefined
  const navigate = useNavigate()

  const debounce = (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => handleChange(value), 1000)
  }

  const handleChange = (value: string) => {
    const searchValue = value === '' ? 'a' : value
    setSearchFor(searchValue)
    navigate(`/search/value=${searchValue}`)
  }

  return (
    <input
      type="search"
      placeholder="Search For a Movie..."
      className="bg-gray-200 border-gray-300 text-sm rounded-lg w-2/5 focus:outline-none focus:border-blue-500 p-2.5 dark:bg-gray-900 lg:w-1/3"
      onChange={(event) => debounce(event.target.value)}
    />
  )
}

export default SearchBar
