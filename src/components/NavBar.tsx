import SearchBar from './ui/SearchBar'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function NavBar() {
  const [searchFocus, setSearchFocus] = useState(false)
  return (
    <nav className="top-0 sticky w-screen z-10 flex justify-between p-2 md:p-5 md:w-full bg-bg-primary dark:bg-bg-primary-dark border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
      <Link to="/" className="flex">
        <h1
          className={`my-auto h-min text-base whitespace-nowrap md:hidden ${
            searchFocus ? 'hidden' : ''
          }`}
        >
          <span className="text-primary">M</span>ovie{' '}
          <span className="text-secondary">M</span>ania
        </h1>
      </Link>
      <SearchBar searchFocus={searchFocus} setSearchFocus={setSearchFocus} />
    </nav>
  )
}

export default NavBar
