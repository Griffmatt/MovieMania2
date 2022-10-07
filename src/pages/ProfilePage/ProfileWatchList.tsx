import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../../components/MovieGrid'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { fetchWatchList } from '../../fireBaseUtils/fetchWatchList'

import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  profileId: string
}

function ProfileWatchList({ profileId }: Props) {
  const { data: movies, isLoading } = useQuery(['watch-list', profileId], () =>
    fetchWatchList(profileId)
  )

  if (isLoading) return <LoadingComponent />
  if (movies && movies[0]) return <MovieGrid movies={movies} />
  return <ProfileSectionEmpty message="add" />
}

export default ProfileWatchList
