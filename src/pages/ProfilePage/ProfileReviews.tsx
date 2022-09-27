import React from 'react'

import Review from '../../components/Review'
import { Ireview } from '../../typescript/interfaces/review'
import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  reviews: Ireview[]
}

function ProfileReviews({ reviews }: Props) {
  return (
    <>
      {reviews.length > 0 ? (
        <div className="grid gap-3 p-3">
          {reviews.map((review) => {
            return (
              <React.Fragment key={review.id}>
                <Review review={review} />
              </React.Fragment>
            )
          })}
        </div>
      ) : (
        <ProfileSectionEmpty message="review" />
      )}
    </>
  )
}

export default ProfileReviews
