import { useQuery } from '@tanstack/react-query'
import Review from '../../components/Review'
import LoadingComponent from '../../components/ui/LoadingComponent'
import { fetchUserReviews } from '../../fireBaseUtils/fetchUserReviews'
import ProfileSectionEmpty from './ProfileSectionEmpty'

interface Props {
  user: string
}

function ProfileReviews({ user }: Props) {
  const { data: reviews, isLoading } = useQuery(['reviews', user], () =>
    fetchUserReviews(user)
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
