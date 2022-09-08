import FavoritedIcon from './ui/FavoritedIcon'
import { Link } from 'react-router-dom'
import { Imovie } from '../typescript/interfaces/movie'

import style from './styles/MoviePoster.module.css'

interface Props{
    movie: Imovie;
    posterSize: string;
}


function MoviePoster({movie, posterSize}: Props) {
    const base_url = `https://image.tmdb.org/t/p/w${posterSize}`



  return (
    <div key={movie.id} className={style.poster}>
        <FavoritedIcon movie={movie} />
        <Link to={`/${movie.id}`}>
            <img
                src={`${base_url}${movie.poster_path}`}
                alt={movie.title}
                className={style.img}
            />
        </Link>
    </div>
  )
}

export default MoviePoster