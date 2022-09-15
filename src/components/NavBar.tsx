function NavBar() {
  return (
    <nav className="top-0 sticky z-10 flex justify-between p-5 border-b-black bg-gray-100/95">
      <a href="/" className="flex flex-col justify-center">
        <h1 className="text-xl">
          <span className="text-blue-500">M</span>ovie{' '}
          <span className="text-orange-500">M</span>ania
        </h1>
      </a>
      <input
        type="search"
        placeholder="Search For a Movie..."
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/3 focus:outline-none focus:border-blue-500 p-2.5"
      />
    </nav>
  )
}

export default NavBar
