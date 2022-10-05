import { Link } from 'react-router-dom'
import { useModalContext } from '../context/modalContext'

import { useThemeContext } from '../context/themeContext'
import { useUserContext } from '../context/userContext'
import profileImage from '/Images/profileImage.png'

function SideBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { openLoginModal } = useModalContext()
  const { userData } = useUserContext()

  const handleClick = () => {
    openLoginModal()
  }

  return (
    <nav className="hidden pt-2  md:w-[10%] lg:w-1/6 top-0 sticky text-center h-fit md:grid gap-5">
      <Link to="/">
        <h1 className="text-primary font-extrabold text-6xl">M</h1>
      </Link>
      <div className="grid gap-5 w-fit mx-auto">
        <Link to={`/`} className="side-nav__link">
          <svg
            className="fill-black dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2.1 1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691 6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z" />
          </svg>
          <h2 className="hidden lg:block">Home</h2>
        </Link>
        <Link to={`/explore`} className="side-nav__link">
          <svg
            className="fill-black dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M9 2C5.146 2 2 5.146 2 9s3.146 7 7 7a6.959 6.959 0 0 0 4.574-1.719l.426.426V16l5.586 5.586a1.415 1.415 0 0 0 2-2L16 14h-1.293l-.426-.426A6.959 6.959 0 0 0 16 9c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z" />
          </svg>
          <h2 className="hidden lg:block">Explore</h2>
        </Link>

        <button onClick={handleDarkMode} className="side-nav__link">
          <svg
            className="fill-black dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M11.875.188a.998.998 0 0 0-.875 1v2c-.004.359.184.695.496.878.313.18.695.18 1.008 0 .312-.183.5-.52.496-.878v-2a1.004 1.004 0 0 0-1.125-1ZM4 3.374a.994.994 0 0 0-.781.703c-.106.367.004.758.281 1.016L4.906 6.5c.242.297.63.434 1.004.348.371-.086.664-.38.75-.75a1.004 1.004 0 0 0-.348-1.004L4.907 3.687a1 1 0 0 0-.718-.312H4Zm15.688 0a1.005 1.005 0 0 0-.594.313l-1.407 1.406a1.004 1.004 0 0 0-.347 1.004c.086.37.379.664.75.75.375.086.762-.051 1.004-.348L20.5 5.094a1.002 1.002 0 0 0-.719-1.719h-.093ZM12 5.188c-3.844 0-7 3.156-7 7 0 3.843 3.156 7 7 7s7-3.157 7-7c0-3.844-3.156-7-7-7Zm0 2c2.754 0 5 2.246 5 5 0 2.753-2.246 5-5 5a5.01 5.01 0 0 1-5-5c0-2.754 2.246-5 5-5Zm-11.188 4c-.55.05-.957.542-.906 1.093.051.551.543.957 1.094.906h2c.36.004.695-.183.879-.496a1.01 1.01 0 0 0 0-1.007c-.184-.313-.52-.5-.879-.496H.812Zm20 0c-.55.05-.957.542-.906 1.093.051.551.543.957 1.094.906h2c.36.004.695-.183.879-.496a1.01 1.01 0 0 0 0-1.007c-.184-.313-.52-.5-.879-.496h-2.187ZM5.47 17.593a.99.99 0 0 0-.563.312L3.5 19.281a1.006 1.006 0 0 0 1.406 1.438l1.407-1.407c.324-.3.41-.777.214-1.171a.996.996 0 0 0-1.058-.547Zm12.718 0a.994.994 0 0 0-.78.703c-.106.367.003.758.28 1.015l1.407 1.407A1.006 1.006 0 0 0 20.5 19.28l-1.406-1.375a1.004 1.004 0 0 0-.813-.312h-.093Zm-6.312 2.593a.998.998 0 0 0-.875 1v2c-.004.36.184.696.496.88.313.18.695.18 1.008 0 .312-.184.5-.52.496-.88v-2a1.004 1.004 0 0 0-1.125-1Z" />
          </svg>
          <h2 className="hidden lg:block">{darkMode ? 'Light' : 'Dark'}</h2>
        </button>

        {userData == null ? (
          <button onClick={handleClick} className="side-nav__link">
            <img className="w-6 h-6" src={profileImage} alt="Profile" />
            <h2 className="hidden lg:block">Login</h2>
          </button>
        ) : (
          <Link to={`/profile-page`} className="side-nav__link">
            <img className="w-6 h-6" src={profileImage} alt="Profile" />
            <h2 className="hidden lg:block">Profile</h2>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default SideBar
