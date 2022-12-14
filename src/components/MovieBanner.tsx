import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
}

function MovieBanner({ movie }: Props) {
  const base_url = `https://image.tmdb.org/t/p/original`
  return (
    <div className="img-wrapper">
      <img
        src={`${base_url}${movie.backdrop_path}`}
        alt={movie.title}
        className="rounded-xl"
      />
    </div>
  )
}

export default MovieBanner
