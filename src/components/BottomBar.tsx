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
    <div className="w-screen  py-3 bg-black text-white bottom-0 sticky  md:hidden">
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

        <li className="rounded-3xl w-fit cursor-pointer">
          <button
            onClick={() => {
              setDarkMode(!darkMode)
            }}
          >
            <p>{darkMode ? 'Light' : 'Dark'}</p>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default BottomBar
