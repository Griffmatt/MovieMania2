import { useState, useEffect } from 'react'
import MovieGrid from '../../components/MovieGrid'

import { useSelector } from 'react-redux'
import { selectWatchList } from '../../redux/watchListSlice'
import { selectReview } from '../../redux/reviewSlice'
import { Link, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileReviews from './ProfileReviews'

const MENU_OPTIONS = [
  {
    name: 'Reviews',
    value: '',
  },
  {
    name: 'Watch List',
    value: 'watch-list',
  },
  {
    name: 'Stats',
    value: 'stats',
  },
]

interface Option {
  name: string
  value: string
}

function ProfilePage() {
  const { value } = useParams()
  const [openMenu, setOpenMenu] = useState(value ?? 'reviews')
  const watchListMovies = useSelector(selectWatchList)
  const reviews = useSelector(selectReview)

  useEffect(() => {
    setOpenMenu(value ?? '')
  }, [value])

  return (
    <div className="flex">
      <div className="p-4 w-full md:p-8 md:w-3/4 md:border-r-2 md:border-bg-secondary md:dark:border-bg-secondary-dark md:min-h-screen">
        <ProfileHeader reviews={reviews.length} />
        <nav className="px-8 py-2 flex justify-around gap-5 border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
          {MENU_OPTIONS.map((option: Option) => {
            return (
              <Link
                to={`/profile-page/${option.value}`}
                key={option.name}
                className={`${option.value === 'stats' ? 'md:hidden' : ''}`}
              >
                <button
                  className={`text-bg md:text-lg font-semibold cursor-pointer ${
                    openMenu === option.value
                      ? 'border-b-2 border-primary text-primary'
                      : ''
                  }`}
                  onClick={() => setOpenMenu(option.value)}
                >
                  {option.name}
                </button>
              </Link>
            )
          })}
        </nav>
        {openMenu === '' && <ProfileReviews reviews={reviews} />}
        {openMenu === 'watch-list' && <MovieGrid movies={watchListMovies} />}
      </div>
      <div className="w-1/4 m-auto text-center sm:hidden">Hi</div>
    </div>
  )
}

export default ProfilePage
