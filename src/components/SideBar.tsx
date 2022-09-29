import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useThemeContext } from '../context/themeContext'
import { sideOptions } from '../shared/navBarOptions'

import { genres } from '../shared/genres'

function SideBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const [genresOpen, setGenresOpen] = useState(false)

  return (
    <nav className="hidden py-5 w-1/6 top-0 sticky text-center h-fit md:grid gap-3">
      <Link to="/">
        <h1>
          <span className="text-primary">M</span>ovie
          <br />
          <span className="text-secondary">M</span>ania
        </h1>
      </Link>
      <ul className="grid gap-2">
        {sideOptions.map((option) => {
          return (
            <React.Fragment key={option.name}>
              <Link
                to={`/${option.value}`}
                className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-bg-secondary  dark:hover:bg-bg-secondary-dark"
              >
                <li>
                  <h3>{option.name}</h3>
                </li>
              </Link>
            </React.Fragment>
          )
        })}
        <li>
          <button
            onClick={handleDarkMode}
            className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-bg-secondary  dark:hover:bg-bg-secondary-dark"
          >
            <h3>{darkMode ? 'Light' : 'Dark'}</h3>
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar
