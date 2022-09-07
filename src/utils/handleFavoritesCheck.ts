import { Imovie } from '../typescript/interfaces/movie'

export const handleFavoritesCheck = (movie: Imovie, favorites: Imovie[]) => {
  let filtered = favorites.find(
    (favorite: Imovie) => movie.title === favorite.title
  )
  return filtered !== undefined
}
