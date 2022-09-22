import React from 'react'
import { Link } from 'react-router-dom'

import Review from '../../components/Review'
import { Ireview } from '../../typescript/interfaces/review'

interface Props {
  reviews: Ireview[]
}

function ProfileReviews({ reviews }: Props) {
  return (
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
          <div className="bg-bg-secondary dark:bg-bg-secondary-dark p-14 rounded-2xl text-center grid gap-6">
            <h2>You haven&apos;t reviewed any movies yet</h2>
            <Link to="/explore">
              <h3>Click here to find a movie to review</h3>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileReviews
