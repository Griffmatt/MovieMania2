import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  const [active, setActive] = useState(false)
  return (
    <div className="navBar">
      <nav className="navItems">
        <a href="/">
          <h1>
            <span className="titleMovie">M</span>ovie
            <span className="titleMania">M</span>ania
          </h1>
        </a>
        <div
          onClick={() => setActive(!active)}
        >
          <ul className={`navLinks ${active ? 'active' : ''}`}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/search-movies">Search</NavLink>
            </li>
            <li>
              <NavLink to="/profile-page">Profile</NavLink>
            </li>
          </ul>
        </div>
        <div
          className={`hamburger ${active ? 'active' : ''}`}
          onClick={() => setActive(!active)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>
      </nav>
    </div>
  )
}

export default NavBar
