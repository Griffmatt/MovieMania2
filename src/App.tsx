import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import SingleMoviePage from './pages/SingleMoviePage/SingleMoviePage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

import { Routes, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import requests from './shared/requests'
import LoginModal from './components/LoginModal'
import { useModalContext } from './context/modalContext'
import LoadingScreen from './components/ui/LoadingScreen'
import { useEffect, useState } from 'react'

function App() {
  const { isOpenLogin } = useModalContext()
  const [initialLoad, setInitialLoad] = useState(true)
  useEffect(() => {
    setTimeout(() => setInitialLoad(false), 1000)
  }, [])
  const Layout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  )
  const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<SingleMoviePage />} />
          <Route path="/profile-page/:value" element={<ProfilePage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Route>
        <Route
          path="/search/q=:value"
          element={<MovieSearchPage request={requests.fetchSearch} />}
        />
        <Route
          path="/genre=:value"
          element={<MovieSearchPage request={requests.fetchByGenre} />}
        />
        <Route
          path="/explore"
          element={<MovieSearchPage request={requests.fetchPopular} />}
        />
      </Routes>
    )
  }
  return (
    <>
      <div className="md:container mx-auto sm:mb-12">
        {isOpenLogin && <LoginModal />}
        <div className="flex">
          <SideBar />
          <div className="md:border-l-2 md:border-bg-secondary dark:border-bg-secondary-dark md:w-5/6 md:min-h-screen">
            <AppRoutes />
          </div>
        </div>
      </div>
      <BottomBar />
      <ScrollToTop />
      {initialLoad && <LoadingScreen />}
    </>
  )
}

export default App
