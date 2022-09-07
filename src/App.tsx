import './styles/base.css'
import './styles/MovieRow.css'
import './styles/NavBar.css'
import './styles/MovieInfo.css'
import './styles/MovieBanner.css'
import './styles/Reviews.css'
import './styles/YourReview.css'
import './styles/MovieMedia.css'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'

import { Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function App() {
  const FilterMovie = () => {
    const { id } = useParams()
    return <MovieInfoPage id={id} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path={`/:id`} element={<FilterMovie />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/search-movies" element={<MovieSearchPage />} />
        </Routes>
      </header>
    </div>
  )
}

export default App
