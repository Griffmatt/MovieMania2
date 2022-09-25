import { Link } from 'react-router-dom'

function FindMoviesModal({ message }: { message: string }) {
  return (
    <div className="flex justify-center py-10">
      <div className="bg-bg-secondary dark:bg-bg-secondary-dark p-3 md:w-96 rounded-2xl text-center grid gap-6">
        <h2>You haven&apos;t {message}ed any movies yet</h2>
        <Link to="/explore">
          <h3>Click here to find a movie to {message}</h3>
        </Link>
      </div>
    </div>
  )
}

export default FindMoviesModal
