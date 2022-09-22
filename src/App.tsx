import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

import { Routes, Route, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeContext } from './context/themeContext'

function App() {
  const { darkMode } = useThemeContext()

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [darkMode])

  const Layout = () => (
    <>
      <NavBar />
      <div className="border-t-2 border-bg-secondary dark:border-bg-secondary-dark">
        <Outlet />
      </div>
    </>
  )

  return (
    <div className="container mx-auto">
      <div className="flex">
        <SideBar />
        <div className="border-l-2 border-bg-secondary dark:border-bg-secondary-dark md:w-5/6">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/:id" element={<MovieInfoPage />} />
              <Route path="/profile-page/:value" element={<ProfilePage />} />
              <Route path="/profile-page" element={<ProfilePage />} />
            </Route>
            <Route path="/search/q=:value" element={<MovieSearchPage />} />
            <Route path="/explore" element={<MovieSearchPage />} />
          </Routes>
        </div>
      </div>
      <BottomBar />
    </div>
  )
}

export default App
