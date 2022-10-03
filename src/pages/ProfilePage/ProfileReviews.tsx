import Review from '../../components/Review'
import { Ireview } from '../../typescript/interfaces/review'
import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  reviews: Ireview[]
  isLoading: boolean
}

function ProfileReviews({ reviews, isLoading }: Props) {
  if (isLoading) return <div></div>

  const reversed = [...reviews].reverse()
  if (reviews[0])
    return (
      <div>
        {reversed.map((review) => {
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
    )
  return <ProfileSectionEmpty message="review" />
}

export default ProfileReviews
