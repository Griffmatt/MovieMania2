import MovieGrid from '../../components/MovieGrid'

import ProfileSectionEmpty from './ProfileSectionEmpty'
import { Imovie } from '../../typescript/interfaces/movie'

interface Props {
  movies: Imovie[]
}

function ProfileWatchList({ movies }: Props) {
  return (
    <>
      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <ProfileSectionEmpty message="add" />
      )}
    </>
  )
}

export default ProfileWatchList
