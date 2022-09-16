import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
  posterSize: string
}

function MoviePoster({ movie, posterSize }: Props) {
  const base_url = `https://image.tmdb.org/t/p/w${posterSize}`

  return (
    <img
      src={`${base_url}${movie.poster_path}`}
      alt={movie.title}
      className="rounded-xl"
    />
  )
}

export default MoviePoster
