import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  searchFocus: boolean
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ searchFocus, setSearchFocus }: Props) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const searchValue = value === '' ? 'a' : value
    navigate(`/search/q=${searchValue}`)
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className={`w-2/5 ${searchFocus ? 'sm:w-4/5' : ''} `}
    >
      <input
        type="search"
        value={value}
        placeholder="Search"
        className="bg-gray-200 border-gray-300 text-sm rounded-lg w-full h-10 focus:outline-none focus:border-blue-500 focus:border-2 p-2.5 dark:bg-gray-900"
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
    </form>
  )
}

export default SearchBar
