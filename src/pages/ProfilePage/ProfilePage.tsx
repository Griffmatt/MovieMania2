import MovieRow from '../../components/MovieRow'

import {useSelector } from "react-redux";
import { selectFavorite } from "../../redux/favoriteSlice";

function ProfilePage() {

  const favorites = useSelector(selectFavorite)

  return (
    <>
        <h1><span className="movieSelectionTitle">Favorited</span> Movies</h1>
        {favorites && <MovieRow movies={favorites} />}
    </>
  )
}

export default ProfilePage