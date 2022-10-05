import { useQuery } from '@tanstack/react-query'
import { useUserContext } from '../../context/userContext'
import { fetchReview } from '../../fireBaseUtils/fetchReview'
import { Imovie } from '../../typescript/interfaces/movie'
import ReviewButton from './MovieInfoComponents/ReviewButton'
import ReviewModal from './MovieInfoComponents/ReviewModal'

interface Props {
  movie: Imovie
}

function ReviewMovie({ movie }: Props) {
  const { userId } = useUserContext()
  const { data: review, isLoading } = useQuery(
    ['review', movie.id, userId],
    () => fetchReview(userId, movie.id)
  )

  return (
    <>
      <ReviewButton review={review} isLoading={isLoading} />
      <ReviewModal movie={movie} userReview={review} />
    </>
  )
}

export default ReviewMovie
