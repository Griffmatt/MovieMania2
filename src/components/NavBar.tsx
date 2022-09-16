import SearchBar from './ui/SearchBar'

function NavBar() {
  return (
    <nav className="top-0 sticky z-10 flex justify-between p-5 border-b-black bg-gray-100/95 dark:bg-gray-800/95">
      <a href="/" className="flex flex-col justify-center">
        <h1 className="text-xl">
          <span className="text-blue-500">M</span>ovie{' '}
          <span className="text-orange-500">M</span>ania
        </h1>
      </a>
      <SearchBar />
    </nav>
  )
}

export default NavBar
