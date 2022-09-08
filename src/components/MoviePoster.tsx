import FavoritedIcon from './ui/FavoritedIcon'
import { Link } from 'react-router-dom'
import { Imovie } from '../typescript/interfaces/movie'

interface Props{
    movie: Imovie;
    index: number;
}


function MoviePoster({movie, index}: Props) {
    const base_url = 'https://image.tmdb.org/t/p/w300'

    const movieQuality = (vote_average: number) => {
        if (vote_average > 9) return 'greatMovie'
        if (vote_average > 7.5) return 'goodMovie'
        if (vote_average > 5) return 'averageMovie'
        return 'badMovie'
      }

  return (
    <div key={index} className="moviePoster">
        <FavoritedIcon movie={movie} />
        <Link to={`/${movie.id}`}>
        <div
            className={`movieRating ${movieQuality(movie.vote_average)}`}
        >
            {movie.vote_average === 0 ? '' : movie.vote_average}
        </div>
        <img
            src={`${base_url}${movie.poster_path}`}
            alt={movie.title}
        />
        </Link>
    </div>
  )
}

export default MoviePoster