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
    <>
      {genres.map((genre) => (
        <Link key={genre.name} className="w-fit" to={`/genre=${genre.id}`}>
          <h5
            className={`whitespace-nowrap border-2 px-2 py-1 rounded-xl ${
              Number(value) === genre.id ? 'border-primary text-primary' : ''
            }`}
          >
            {genre.name}
          </h5>
        </Link>
      ))}
    </>
  )
}

export default Genres
