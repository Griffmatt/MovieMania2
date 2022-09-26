import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
}

function MoviePoster({ movie }: Props) {
  const base_url = `https://image.tmdb.org/t/p/w500`

  return (
    <>
      {movie.poster_path ? (
        <img
          src={`${base_url}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full h-full"
        />
      ) : (
        <div className="bg-bg-secondary dark:bg-bg-secondary-dark rounded-xl w-full h-full flex m-auto justify-center items-center text-center">
          {movie.title} <br /> Image Unavailable
        </div>
      )}
    </>
  )
}

export default MoviePoster
