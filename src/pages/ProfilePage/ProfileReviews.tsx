import { useQuery } from '@tanstack/react-query'
import Review from '../../components/Review'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { fetchUserReviews } from '../../fireBaseUtils/fetchUserReviews'
import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  profileId: string
}

function ProfileReviews({ profileId }: Props) {
  const { data: reviews, isLoading } = useQuery(['reviews', profileId], () =>
    fetchUserReviews(profileId)
  )
  if (isLoading) return <LoadingComponent />

  if (reviews && reviews[0])
    return (
      <div>
        {[...reviews].reverse().map((review) => {
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
