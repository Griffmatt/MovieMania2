import React from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../context/themeContext'

function BottomBar() {
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
      name: 'Explore',
      value: 'explore',
    },
  ]

  return (
    <nav className="w-screen py-3 border-t-2 border-bg-secondary dark:border-bg-secondary-dark bg-bg-primary dark:bg-bg-primary-dark fixed bottom-0 md:hidden">
      <ul className="flex justify-around">
        {options.map((option) => {
          return (
            <React.Fragment key={option.name}>
              <Link to={`/${option.value}`} className="flex">
                <li className="my-auto rounded-3xl w-fit cursor-pointer">
                  <p>{option.name}</p>
                </li>
              </Link>
            </React.Fragment>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomBar
