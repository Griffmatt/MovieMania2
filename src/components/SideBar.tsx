import { signOut } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom'
import { useModalContext } from '../context/modalContext'

import { useThemeContext } from '../context/themeContext'
import { useUserContext } from '../context/userContext'
import { auth } from '../firebase'
import { sideOptions } from '../shared/navBarOptions'

function SideBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { openLoginModal } = useModalContext()
  const { userId, userData } = useUserContext()

  const handleLogin = async () => {
    if (userId === null) {
      openLoginModal()
      return
    }
    await signOut(auth)
  }

  return (
    <nav className="hidden py-5 w-1/6 top-0 sticky text-center h-fit md:grid gap-3">
      <Link to="/">
        <h1>
          <span className="text-primary">M</span>ovie
          <br />
          <span className="text-secondary">M</span>ania
        </h1>
      </Link>
      <div className="grid gap-2">
        {sideOptions.map((option) => {
          if (userData === null && option.name === 'Profile') return
          return (
            <React.Fragment key={option.name}>
              <Link
                to={`/${option.value}`}
                className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-bg-secondary  dark:hover:bg-bg-secondary-dark"
              >
                <h2>{option.name}</h2>
              </Link>
            </React.Fragment>
          )
        })}
        {userData === null && (
          <button
            onClick={() => void handleLogin()}
            className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-bg-secondary  dark:hover:bg-bg-secondary-dark"
          >
            <h2>Login</h2>
          </button>
        )}
        <button
          onClick={handleDarkMode}
          className="rounded-3xl px-3 py-1 w-fit mx-auto hover:bg-bg-secondary  dark:hover:bg-bg-secondary-dark"
        >
          <h2>{darkMode ? 'Light' : 'Dark'}</h2>
        </button>
      </div>
    </nav>
  )
}

export default SideBar
