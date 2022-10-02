import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

import { Routes, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'
import requests from './shared/requests'
import LoginModal from './components/LoginModal'
import { useModalContext } from './context/modalContext'

function App() {
  const { isOpenLogin } = useModalContext()
  const Layout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  )
  return (
    <>
      <div className="md:container mx-auto sm:mb-12">
        {isOpenLogin && <LoginModal />}
        <div className="flex">
          <SideBar />
          <div className="md:border-l-2 md:border-bg-secondary dark:border-bg-secondary-dark md:w-5/6 md:min-h-screen">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/:id" element={<MovieInfoPage />} />
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
          </div>
        </div>
      </div>
      <BottomBar />
      <ScrollToTop />
    </>
  )
}

export default App
