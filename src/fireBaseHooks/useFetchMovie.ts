import { useQueries } from '@tanstack/react-query'
import { checkWatchList } from './checkWatchList'
import { fetchReview } from './fetchReview'
import { fetchMovies } from '../utils/fetchMovies'
import requests from '../shared/requests'
import { Imovie } from '../typescript/interfaces/movie'
import { Iuser } from '../typescript/interfaces/user'

export const useFetchMovie = (id: string) => {
  const userJSON = localStorage.getItem('user')
  const user = JSON.parse(userJSON) as Iuser
  const results = useQueries({
    queries: [
      {
        queryKey: ['movie', id],
        queryFn: () =>
          fetchMovies<Imovie>(`/movie/${id}${requests.fetchMovieInfo}`),
      },
      { queryKey: ['review', id], queryFn: () => fetchReview(id, user) },
      {
        queryKey: ['on-watch-list', id],
        queryFn: () => checkWatchList(id, user),
      },
    ],
  })

  return results
}
