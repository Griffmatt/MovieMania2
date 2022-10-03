import MovieGrid from '../../components/MovieGrid'

import ProfileSectionEmpty from './ProfileSectionEmpty'
import { useFetchWatchList } from '../../fireBaseHooks/useFetchWatchList'

function ProfileWatchList() {
  const { watchList, isLoadingWatchList } = useFetchWatchList()
  if (isLoadingWatchList) return <div></div>
  if (watchList[0]) return <MovieGrid movies={watchList ?? []} />
  return <ProfileSectionEmpty message="add" />
}

export default ProfileWatchList
