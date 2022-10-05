import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../../components/MovieGrid'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { fetchWatchList } from '../../fireBaseUtils/fetchWatchList'

import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  userId: string
}

function ProfileWatchList({ userId }: Props) {
  const { data, isLoading } = useQuery(['watch-list', userId], () =>
    fetchWatchList(userId)
  )
  if (isLoading) return <LoadingComponent />
  if (data && data[0]) return <MovieGrid movies={data} />
  return <ProfileSectionEmpty message="add" />
}

export default ProfileWatchList
