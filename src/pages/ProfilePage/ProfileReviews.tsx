import { useQuery } from '@tanstack/react-query'
import Review from '../../components/Review'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { getDocument } from '../../fireBaseUtils/getDocument'
import { Ireview } from '../../typescript/interfaces/review'
import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  profileId: string
}

function ProfileReviews({ profileId }: Props) {
  const { data: reviews, isLoading } = useQuery(['reviews', profileId], () =>
    getDocument<{ reviews: Ireview[] }>('reviews', profileId)
  )

  if (isLoading) return <LoadingComponent />

  if (reviews)
    return (
      <div>
        {reviews.reviews.reverse().map((review) => {
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
