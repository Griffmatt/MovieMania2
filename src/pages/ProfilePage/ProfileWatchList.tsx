import { useSelector } from 'react-redux'
import MovieGrid from '../../components/MovieGrid'
import { selectWatchList } from '../../redux/watchListSlice'

import ProfileSectionEmpty from './ProfileSectionEmpty'

function ProfileWatchList() {
  const watchListMovies = useSelector(selectWatchList)
  return (
    <>
      {watchListMovies.length > 0 ? (
        <MovieGrid movies={watchListMovies} />
      ) : (
        <ProfileSectionEmpty message="add" />
      )}
    </>
  )
}

export default ProfileWatchList
