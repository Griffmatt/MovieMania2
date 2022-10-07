import profileImage from '/Images/profileImage.png'
import { Ireview } from '../typescript/interfaces/review'
import { Link } from 'react-router-dom'

interface Props {
  review: Ireview
  profileReview?: boolean
}

function Review({ review, profileReview }: Props) {
  return (
    <div className="flex gap-3">
      <img src={profileImage} alt="Profile" className="w-10 h-10" />
      <div className="grid gap-1 w-full">
        <div className="flex justify-between">
          <div className="flex xs:flex-col items-end sm:gap-1">
            <h4 className="font-bold">{review.name}</h4>
            <h4 className="text-font-secondary">@{review.userName}</h4>
          </div>
          <h4 className="font-bold">{review.rating}/10</h4>
        </div>
        {profileReview && (
          <Link to={`/${review.movieId}`} className="w-fit">
            <h3 className="text-black dark:text-white hover:lg:text-primary">
              {review.title}
            </h3>
          </Link>
        )}
        <p className="col-span-full">{review.review}</p>
      </div>
    </div>
  )
}

export default Review
