import { Link } from 'react-router-dom'

import { useThemeContext } from '../context/themeContext'
import { useModalContext } from '../context/modalContext'
import { useUserContext } from '../context/userContext'
import profileImage from '/Images/profileImage.png'

function BottomBar() {
  const { darkMode, handleDarkMode } = useThemeContext()
  const { openLoginModal } = useModalContext()
  const { userData } = useUserContext()

  const handleClick = () => {
    openLoginModal()
  }

  return (
    <nav className="w-screen border-t-2 border-bg-secondary dark:border-bg-secondary-dark bg-bg-primary dark:bg-bg-primary-dark fixed bottom-0 md:hidden">
      <div className="flex justify-around">
        <Link to={`/`} className="rounded-3xl w-full cursor-pointer">
          <svg
            className="fill-black dark:fill-white mx-auto py-2 h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M12 2.1 1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691 6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z" />
          </svg>
        </Link>
        <Link to={`/explore`} className="rounded-3xl w-full cursor-pointer">
          <svg
            className="fill-black dark:fill-white mx-auto py-2 h-full"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path d="M9 2C5.146 2 2 5.146 2 9s3.146 7 7 7a6.959 6.959 0 0 0 4.574-1.719l.426.426V16l5.586 5.586a1.415 1.415 0 0 0 2-2L16 14h-1.293l-.426-.426A6.959 6.959 0 0 0 16 9c0-3.854-3.146-7-7-7zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5z" />
          </svg>
        </Link>

        <button
          onClick={handleDarkMode}
          className="rounded-3xl w-full cursor-pointer"
        >
          <h5 className="mx-auto py-2 h-full">{darkMode ? 'Light' : 'Dark'}</h5>
        </button>

        {userData == null ? (
          <button
            onClick={handleClick}
            className="rounded-3xl w-full cursor-pointer"
          >
            <h5 className="mx-auto py-2 h-full">Login</h5>
          </button>
        ) : (
          <Link
            to={`/profile/${userData.uid}`}
            className="rounded-3xl w-full cursor-pointer"
          >
            <img
              className="w-6 mx-auto py-2 h-full"
              src={profileImage}
              alt="Profile"
            />
          </Link>
        )}
      </div>
    </nav>
  )
}

export default BottomBar
