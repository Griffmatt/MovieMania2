import { useQueries } from '@tanstack/react-query'
import Review from '../../components/Review'
import { fetchUserReviews } from '../../fireBaseUtils/fetchUserReviews'
import { Ireview } from '../../typescript/interfaces/review'

interface Props {
  following: string[]
  userId?: string | null
}

function UserFeed({ following }: Props) {
  const reviews = useQueries({
    queries: following.map((followingId) => {
      return {
        queryKey: ['reviews', followingId],
        queryFn: () => fetchUserReviews(followingId),
      }
    }),
  })

  const sortReviews = () => {
    const reviewsArr = [] as Ireview[]
    reviews?.forEach((review) => {
      if (review.data == null) return
      reviewsArr.push(...review.data)
    })
    console.log(reviewsArr)
    return reviewsArr.sort((a, b) => b.time - a.time)
  }

  const followingReviews = sortReviews()

  return (
    <>
      {followingReviews && (
        <div>
          {followingReviews.map((review) => {
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
      )}
    </>
  )
}

export default UserFeed
