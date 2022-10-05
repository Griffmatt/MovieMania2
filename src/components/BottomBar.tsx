import React from 'react'
import { Link } from 'react-router-dom'

import { bottomOptions } from '../shared/navBarOptions'

import { useThemeContext } from '../context/themeContext'
import { useModalContext } from '../context/modalContext'
import { useUserContext } from '../context/userContext'

function BottomBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { openLoginModal } = useModalContext()
  const { userData } = useUserContext()

  const handleClick = () => {
    openLoginModal()
  }

  return (
    <nav className="w-screen py-4 border-t-2 border-bg-secondary dark:border-bg-secondary-dark bg-bg-primary dark:bg-bg-primary-dark fixed bottom-0 md:hidden">
      <div className="flex justify-around">
        {bottomOptions.map((option) => {
          if (userData === null && option.name === 'Profile') return
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

        {userData === null && (
          <button
            onClick={handleClick}
            className="rounded-3xl w-fit cursor-pointer"
          >
            <p>Login</p>
          </button>
        )}

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
