import React, { useState, useEffect } from 'react'
import Review from '../../components/Review'

import MovieRow from '../../components/MovieGrid'

import { useSelector } from 'react-redux'
import { selectWatchList } from '../../redux/watchListSlice'
import { selectReview } from '../../redux/reviewSlice'
import { Link, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'

const MENU_OPTIONS = [
  {
    name: 'Reviews',
    value: '',
  },
  {
    name: 'Watch List',
    value: 'watch-list',
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
    <div className="p-8">
      <ProfileHeader reviews={reviews.length} />
      <div className="px-8 py-2 flex justify-center gap-5 border-b-2 dark:border-gray-700">
        {MENU_OPTIONS.map((option: Option) => {
          return (
            <Link to={`/profile-page/${option.value}`} key={option.name}>
              <button
                className={`text-lg font-semibold hover:text-gray-400 cursor-pointer ${
                  openMenu === option.value ? 'border-b-2 border-blue-700' : ''
                }`}
                onClick={() => setOpenMenu(option.value)}
              >
                {option.name}
              </button>
            </Link>
          )
        })}
      </div>
      {openMenu === 'watch-list' ? (
        <MovieRow movies={watchListMovies} />
      ) : (
        <>
          {reviews.length > 0 ? (
            <div className="grid gap-3 px-8">
              {reviews.map((review) => {
                return (
                  <React.Fragment key={review.id}>
                    <Review review={review} />
                  </React.Fragment>
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center py-10">
              <div className="bg-gray-200 dark:bg-gray-700 p-14 rounded-2xl text-center grid gap-6">
                <h2>You haven&apos;t reviewed any movies yet</h2>
                <Link to="/explore">
                  <h3>Click here to find a movie to review</h3>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProfilePage
