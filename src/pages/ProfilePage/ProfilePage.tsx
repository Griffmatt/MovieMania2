import MovieRow from '../../components/MovieGrid'

import { useSelector } from 'react-redux'
import { selectFavorite } from '../../redux/favoriteSlice'

function ProfilePage() {
  const favorites = useSelector(selectFavorite)

  return <>{favorites && <MovieRow movies={favorites} />}</>
}

export default ProfilePage
