import { useQuery } from '@tanstack/react-query'
import MovieGrid from '../../components/MovieGrid'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { getDocument } from '../../fireBaseUtils/getDocument'
import { Poster } from '../../typescript/interfaces/movie'

import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  profileId: string
}

function ProfileWatchList({ profileId }: Props) {
  const { data: movies, isLoading } = useQuery(['watch-list', profileId], () =>
    getDocument<{ watchList: Poster[] }>('watch-list', profileId)
  )

  if (isLoading) return <LoadingComponent />
  if (movies && movies.watchList[0])
    return <MovieGrid movies={movies.watchList} />
  return <ProfileSectionEmpty message="add" />
}

export default ProfileWatchList
