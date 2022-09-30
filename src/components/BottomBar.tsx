import React from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../context/themeContext'

import { bottomOptions } from '../shared/navBarOptions'

function BottomBar() {
  const { darkMode, handleDarkMode } = useThemeContext()

  return (
    <nav className="w-screen py-4 border-t-2 border-bg-secondary dark:border-bg-secondary-dark bg-bg-primary dark:bg-bg-primary-dark fixed bottom-0 md:hidden">
      <div className="flex justify-around">
        {bottomOptions.map((option) => {
          return (
            <React.Fragment key={option.name}>
              <Link
                to={`/${option.value}`}
                className="my-auto rounded-3xl w-fit cursor-pointer"
              >
                <p>{option.name}</p>
              </Link>
            </React.Fragment>
          )
        })}

        <button
          onClick={handleDarkMode}
          className="rounded-3xl w-fit cursor-pointer"
        >
          <p>{darkMode ? 'Light' : 'Dark'}</p>
        </button>
      </div>
    </nav>
  )
}

export default BottomBar
