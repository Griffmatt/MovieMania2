const Genres = ({ genres }: { genres: { name: string }[] }) => {
  if (genres.length === 0) {
    return <p>Genres coming soon...</p>
  }

  return (
    <div className="flex gap-2">
      {genres.map((genre) => (
        <button key={genre.name}>
          <p className="border-2  p-1 rounded-xl hover:text-font-secondary hover:dark:text-font-secondary border-font-primary dark:border-font-primary-dark hover:border-font-secondary hover:dark:border-font-secondary cursor-pointer">
            {genre.name}
          </p>
        </button>
      ))}
    </div>
  )
}

export default Genres
