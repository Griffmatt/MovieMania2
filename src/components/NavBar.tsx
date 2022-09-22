import SearchBar from './ui/SearchBar'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar() {
  const [searchFocus, setSearchFocus] = useState(false)
  return (
    <nav className="top-0 sticky z-10 flex justify-between p-3 md:p-5 bg-bg-primary/95 dark:bg-bg-primary-dark/95">
      <Link to="/" className="flex">
        <h1
          className={`my-auto h-min text-base md:hidden ${
            searchFocus ? 'hidden' : ''
          }`}
        >
          <span className="text-primary">M</span>ovie
          <span className="text-secondary">M</span>ania
        </h1>
      </Link>
      <SearchBar searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
    </nav>
  )
}

export default NavBar
