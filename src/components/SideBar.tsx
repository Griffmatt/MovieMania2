import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  const options = [
    {
      name: 'Home',
      value: '',
    },
    {
      name: 'Search',
      value: 'search',
    },
    {
      name: 'Profile',
      value: 'profile-page',
    },
  ]

  return (
    <div className="w-1/6 top-0 sticky max-auto p-5 text-center">
      <ul>
        {options.map((option, index) => {
          return (
            <React.Fragment key={index}>
              <Link to={`/${option.value}`}>
                <li className="rounded-3xl px-2 py-1 w-fit mx-auto hover:bg-gray-200 cursor-pointer">
                  {option.name}
                </li>
              </Link>
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default SideBar
