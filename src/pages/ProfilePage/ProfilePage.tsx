import { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileReviews from './ProfileReviews'
import ProfileWatchList from './ProfileWatchList'
import { useUserContext } from '../../context/userContext'
import { profileOptions } from '../../shared/navBarOptions'
import { fetchUser } from '../../fireBaseUtils/fetchUser'
import { useQuery } from '@tanstack/react-query'

interface Option {
  name: string
  value: string
}

function ProfilePage() {
  const { profileId, page } = useParams()
  const [openMenu, setOpenMenu] = useState(page ?? 'reviews')
  const { userId } = useUserContext()

  const { data: userData } = useQuery(['user', profileId], () =>
    fetchUser(profileId)
  )

  useEffect(() => {
    setOpenMenu(page ?? '')
  }, [page])
  return (
    <>
      {profileId && (
        <div className="flex">
          <div className=" md:w-3/4 xl:w-2/3 md:border-r-2 md:border-bg-secondary md:dark:border-bg-secondary-dark min-h-[calc(100vh-5.125rem)]">
            <ProfileHeader
              user={userData}
              userId={userId}
              profileId={profileId}
            />
            <nav className="px-8 py-2 flex justify-around gap-5 border-b-2 border-bg-secondary dark:border-bg-secondary-dark">
              {profileOptions.map((option: Option) => {
                return (
                  <Link
                    to={`/profile/${profileId}/${option.value}`}
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
            {openMenu === '' && <ProfileReviews profileId={profileId} />}
            {openMenu === 'watch-list' && (
              <ProfileWatchList profileId={profileId} />
            )}
          </div>
          <div className="sticky top-[4.625rem] lg:top-[5.125rem] md:w-1/4 xl:w-1/3 h-fit p-10 hidden md:block">
            <div className="text-center">hi</div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePage
