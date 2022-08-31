import './styles/base.css';
import './styles/MovieRow.css'
import './styles/NavBar.css'
import './styles/MovieInfo.css'
import './styles/MovieBanner.css'
import './styles/Reviews.css'
import './styles/YourReview.css'
import './styles/MovieMedia.css'

import HomeScreen from './components/screens/HomeScreen/HomeScreen';
import MovieInfo from './components/screens/MovieInfo/MovieInfo';

import {Routes, Route} from 'react-router-dom'
import FavoritedMovies from './components/screens/ProfilePage/ProfilePage';
import MovieSearch from './components/screens/MovieSearch/MovieSearchScreen';

import { useParams } from 'react-router-dom'
import NavBar from './components/NavBar';

function App() {

  const FilterMovie = () => {
    const {id} = useParams()
      return(
        <MovieInfo id={id}/>
      )
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path={`/:id`} element={<FilterMovie/>}/>
          <Route path="/favorite-movies" element={<FavoritedMovies/>}/>
          <Route path="/search-movies" element={<MovieSearch/>}/>
        </Routes>
      </header>
    </div>
  );
}

export default App;
