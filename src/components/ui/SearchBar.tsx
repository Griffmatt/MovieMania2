import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  searchFocus: boolean
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ searchFocus, setSearchFocus }: Props) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    if (value) {
      navigate(`/search/q=${value}`)
    }
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className={`w-2/5 ${searchFocus ? 'sm:w-full' : ''} `}
    >
      <input
        type="search"
        placeholder="Search"
        className="search-bar"
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
    </form>
  )
}

export default SearchBar
