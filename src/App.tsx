import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'
import BottomBar from './components/BottomBar'

import { Routes, Route, Outlet } from 'react-router-dom'
import ScrollToTop from './utils/ScrollToTop'

function App() {
  const Layout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  )

  return (
    <>
      <div className="container mx-auto sm:mb-12">
        <ScrollToTop>
          <div className="flex">
            <SideBar />
            <div className="md:border-l-2 md:border-bg-secondary dark:border-bg-secondary-dark md:w-5/6 md:min-h-screen">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/:id" element={<MovieInfoPage />} />
                  <Route
                    path="/profile-page/:value"
                    element={<ProfilePage />}
                  />
                  <Route path="/profile-page" element={<ProfilePage />} />
                </Route>
                <Route path="/search/q=:value" element={<MovieSearchPage />} />
                <Route path="/explore" element={<MovieSearchPage />} />
              </Routes>
            </div>
          </div>
        </ScrollToTop>
      </div>
      <BottomBar />
    </>
  )
}

export default App
