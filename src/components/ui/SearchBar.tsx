import { useState } from 'react'

import { useSearchContext } from '../../context/searchForContext'
import { useNavigate } from 'react-router-dom'

function SearchBar() {
  const [value, setValue] = useState('')
  const { setSearchFor } = useSearchContext()
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchValue = value === '' ? 'a' : value
    setSearchFor(searchValue)
    navigate(`/search/value=${searchValue}`)
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="w-2/5">
      <input
        type="search"
        value={value}
        placeholder="Search For a Movie..."
        className="bg-gray-200 border-gray-300 text-sm rounded-lg w-full focus:outline-none focus:border-blue-500 p-2.5 dark:bg-gray-900"
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  )
}

export default SearchBar
