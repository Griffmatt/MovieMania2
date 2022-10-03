import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../../components/MovieGrid'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { fetchWatchList } from '../../fireBaseUtils/fetchWatchList'

import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  user: string
}

function ProfileWatchList({ user }: Props) {
  const { data, isLoading } = useQuery(['watch-list', user], () =>
    fetchWatchList(user)
  )
  if (isLoading) return <LoadingComponent />
  if (data && data[0]) return <MovieGrid movies={data} />
  return <ProfileSectionEmpty message="add" />
}

export default ProfileWatchList
