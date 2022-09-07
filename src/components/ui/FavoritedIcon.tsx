import { useDispatch, useSelector } from 'react-redux'
import { selectFavorite } from '../../redux/favoriteSlice'
import { Imovie } from '../../typescript/interfaces/movie'

import { handleFavoritesCheck } from '../../utils/handleFavoritesCheck'
import { handleFavoritesClick } from '../../utils/handleFavoritesClick'

function FavoritedIcon({ movie }: { movie: Imovie }) {
  const favorites = useSelector(selectFavorite)
  const dispatch = useDispatch()

  return (
    <input
      className="star"
      type="checkbox"
      onClick={() => handleFavoritesClick(movie, favorites, dispatch)}
      checked={handleFavoritesCheck(movie, favorites)}
      readOnly
    />
  )
}

export default FavoritedIcon
