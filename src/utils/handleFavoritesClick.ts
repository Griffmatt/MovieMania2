import { addFavorite, removeFavorite} from '../redux/favoriteSlice'
import { Dispatch, AnyAction } from 'redux'

import {Imovie} from "../typescript/interfaces/movie"

export const handleFavoritesClick = (movie: Imovie, favorites: Imovie[], dispatch: Dispatch<AnyAction>) => {
    let filtered = favorites.find((favorite: Imovie) => movie.title=== favorite.title)
    if(filtered){
      dispatch(removeFavorite(movie))
    }else{
      dispatch(addFavorite(movie))
    }
  }