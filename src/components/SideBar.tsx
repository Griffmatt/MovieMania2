import React from 'react'
import { Link } from 'react-router-dom'

import { useThemeContext } from '../context/themeContext'

function SideBar() {
  const { darkMode, setDarkMode } = useThemeContext()

  const options = [
    {
      name: 'Home',
      value: '',
    },
    {
      name: 'Profile',
      value: 'profile-page',
    },
    {
      name: 'Categories',
      value: 'profile-page',
    },
    {
      name: 'Genres',
      value: 'profile-page',
    },
  ]

  return (
    <div className="hidden py-5 w-1/6 top-0 sticky text-center h-fit md:grid gap-3">
      <Link to="/">
        <h1>
          <span className="text-blue-700">M</span>ovie
          <br />
          <span className="text-blue-700">M</span>ania
        </h1>
      </Link>
      <ul className="grid gap-2">
        {options.map((option) => {
          return (
            <React.Fragment key={option.name}>
              <Link to={`/${option.value}`}>
                <li className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-gray-200  dark:hover:bg-gray-900 cursor-pointer">
                  <h3>{option.name}</h3>
                </li>
              </Link>
            </React.Fragment>
          )
        })}

        <li className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-gray-200  dark:hover:bg-gray-900 cursor-pointer">
          <button
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          >
            <h3>{darkMode ? 'Light' : 'Dark'}</h3>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
