import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
}

function MoviePoster({ movie }: Props) {
  const base_url = `https://image.tmdb.org/t/p/original`
  console.log(movie)
  return (
    <img
      src={`${base_url}${movie.backdrop_path}`}
      alt={movie.title}
      className="rounded-lg col-span-4"
    />
  )
}

export default MoviePoster
