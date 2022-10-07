import { useState, useEffect, useRef } from 'react'
import requests from '../../shared/requests'
import MovieGrid from '../../components/MovieGrid'

import { movieOptions } from '../../shared/movieOptions'

import { Imovie } from '../../typescript/interfaces/movie'

import { fetchMovies } from '../../utils/fetchMovies'
import { useQuery } from '@tanstack/react-query'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { useUserContext } from '../../context/userContext'
import UserFeed from './UserFeed'
import { fetchFollowing } from '../../fireBaseUtils/fetchFollowing'
import HomeSideInfo from './HomeSideInfo'

interface Data {
  results: Imovie[]
}

function HomePage() {
  const { userId, userData } = useUserContext()
  const [request] = useState('upcoming')

  const { data: movies, isLoading: isLoadingMovies } = useQuery(
    ['movies', request],
    () => fetchMovies<Data>(`/movie/${request}${requests.fetchMovies}`)
  )

  const { data: following, isLoading: isLoadingFollowing } = useQuery(
    ['following', userId],
    () => fetchFollowing(userId)
  )

  const optionMap = useRef(new Map<string, string>())

  useEffect(() => {
    movieOptions.forEach((option: { name: string; value: string }) => {
      optionMap.current.set(option.value, option.name)
    })
  }, [])
  if (isLoadingMovies && isLoadingFollowing) return <LoadingComponent />
  if (userData === null) {
    return <>{movies && <MovieGrid movies={movies.results} />}</>
  }
  return (
    <>
      {following && (
        <div className="flex">
          <div className=" md:w-3/4 xl:w-2/3 md:border-r-2 md:border-bg-secondary md:dark:border-bg-secondary-dark min-h-[calc(100vh-5.125rem)]">
            <UserFeed following={following} userId={userId} />
          </div>
          <div className="sticky top-[4.625rem] lg:top-[5.125rem] md:w-1/4 xl:w-1/3 h-fit p-4 hidden md:block">
            <HomeSideInfo user={userData} />
          </div>
        </div>
      )}
    </>
  )
}
export default HomePage
