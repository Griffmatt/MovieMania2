import { Imovie } from '../typescript/interfaces/movie'

interface Props {
  movie: Imovie
  posterSize: string
}

function MoviePoster({ movie, posterSize }: Props) {
  const base_url = `https://image.tmdb.org/t/p/w${posterSize}`

  return (
    <>
      {movie.poster_path ? (
        <img
          src={`${base_url}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-60 md:w-max"
        />
      ) : (
        <div className="bg-bg-secondary dark:bg-bg-secondary-dark p-2 w-fit">
          {movie.title} <br /> Image Unavailable
        </div>
      )}
    </>
  )
}

export default MoviePoster
