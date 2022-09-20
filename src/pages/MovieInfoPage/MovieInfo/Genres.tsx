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
          className="border-solid border-2 border-gray-600 p-1 rounded-xl text-sm hover:border-gray-400 hover:text-gray-400 dark:border-gray-100 hover:dark:border-gray-400 cursor-pointer"
        >
          {genre.name}
        </p>
      ))}
    </div>
  )
}

export default Genres
