import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  searchFocus: boolean
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar({ searchFocus, setSearchFocus }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    if (searchValue) {
      navigate(`/search/q=${searchValue}`)
    }
  }

  const handleChange = (value: string) => {
    if (value === ' ') return
    setSearchValue(value)
  }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className={`w-2/5 ${
        searchFocus ? 'xs:w-full ' : ''
      } transition-width flex gap-2`}
    >
      <input
        type="search"
        placeholder="Search"
        className="search-bar transition-width"
        value={searchValue}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
      />
    </form>
  )
}

export default SearchBar
