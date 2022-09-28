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
        <div className="grid gap-3">
          {reviews.map((review) => {
            return (
              <div
                key={review.id}
                className="border-b-2 border-bg-secondary dark:border-bg-secondary-dark p-4"
              >
                <Review review={review} profileReview={true} />
              </div>
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
