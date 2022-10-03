import { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileReviews from './ProfileReviews'
import ProfileWatchList from './ProfileWatchList'
import { useUserContext } from '../../context/userContext'
import { useFetchUserReviews } from '../../fireBaseHooks/useFetchUserReviews'

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
  const { user } = useUserContext()

  const { reviews, isLoadingReviews } = useFetchUserReviews()

  useEffect(() => {
    setOpenMenu(value ?? '')
  }, [value])

  return (
    <>
      {user && (
        <div className="flex">
          <div className="w-full md:w-3/4 xl:w-2/3 md:border-r-2 md:border-bg-secondary md:dark:border-bg-secondary-dark md:min-h-[calc(100vh-5.125rem)]">
            <ProfileHeader user={user} />
            <nav className="px-8 py-2 flex justify-around gap-5 border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
              {MENU_OPTIONS.map((option: Option) => {
                return (
                  <Link
                    to={`/profile-page/${option.value}`}
                    key={option.name}
                    className={`${option.value === 'stats' ? 'md:hidden' : ''}`}
                    onClick={() => setOpenMenu(option.value)}
                  >
                    <h2
                      className={`text-bg md:text-lg font-semibold cursor-pointer ${
                        openMenu === option.value
                          ? 'border-b-2 border-primary text-primary'
                          : ''
                      }`}
                    >
                      {option.name}
                    </h2>
                  </Link>
                )
              })}
            </nav>
            {openMenu === '' && (
              <ProfileReviews
                reviews={reviews ?? []}
                isLoading={isLoadingReviews}
              />
            )}
            {openMenu === 'watch-list' && <ProfileWatchList />}
          </div>
          <div className="sticky top-[5.125rem] md:w-1/4 xl:w-1/3 h-fit p-10 xs:hidden ">
            <div className="text-center">hi</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePage
