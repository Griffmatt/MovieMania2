import { Imovie } from '../../../typescript/interfaces/movie'

const Genres = ({ movie }: { movie: Imovie }) => {
  if (movie.genres.length === 0) {
    return <p>Genres coming soon...</p>
  }

  return (
    <div className="flex gap-2">
      {movie.genres.map((genre) => (
        <p
          key={genre.name}
          className="border-2  p-1 rounded-xl hover:text-font-secondary hover:dark:text-font-secondary border-font-primary dark:border-font-primary-dark hover:border-font-secondary hover:dark:border-font-secondary cursor-pointer"
        >
          {genre.name}
        </p>
      ))}
    </div>
  )
}

export default Genres
