import { Link } from 'react-router-dom'

interface Props {
  genres: { name: string; id: number }[]
  value?: string
}

const Genres = ({ genres, value }: Props) => {
  if (genres.length === 0) {
    return <p>Genres coming soon...</p>
  }

  return (
    <div className="flex gap-2">
      {genres.map((genre) => (
        <Link key={genre.name} className="w-fit" to={`/genre=${genre.id}`}>
          <p
            className={`whitespace-nowrap border-2 px-2 py-1 rounded-xl ${
              Number(value) === genre.id ? 'border-primary text-primary' : ''
            }`}
          >
            {genre.name}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default Genres