import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
}

function MoviePoster({ movie }: Props) {
  const base_url = `https://image.tmdb.org/t/p/original`
  return (
    <img
      src={`${base_url}${movie.backdrop_path}`}
      alt={movie.title}
      className="rounded-xl"
    />
  )
}

export default MoviePoster
