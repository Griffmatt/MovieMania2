import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <SideBar />
        <div className="w-5/6 border-l-2">
          <NavBar />
          <div className="border-t-2">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={`/:id`} element={<MovieInfoPage />} />
              <Route path="/profile-page" element={<ProfilePage />} />
              <Route path="/search" element={<MovieSearchPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
