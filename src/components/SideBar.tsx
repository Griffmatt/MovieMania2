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
  ]

  return (
    <div className="hidden w-1/6 top-0 sticky max-auto p-5 text-center h-fit md:block">
      <ul>
        {options.map((option) => {
          return (
            <React.Fragment key={option.name}>
              <Link to={`/${option.value}`}>
                <li className="rounded-3xl px-2 py-1 w-fit mx-auto hover:bg-gray-200  dark:hover:bg-gray-900 cursor-pointer">
                  {option.name}
                </li>
              </Link>
            </React.Fragment>
          )
        })}

        <li className="rounded-3xl px-2 py-1 w-fit mx-auto hover:bg-gray-200  dark:hover:bg-gray-900 cursor-pointer">
          <button
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          >
            Dark
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
