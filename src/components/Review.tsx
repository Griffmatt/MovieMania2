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
          <div className="flex xs:flex-col xs:gap-0 items-start gap-1 h-fit">
            <h4 className="font-bold">{review.name}</h4>
            <h4 className="text-font-secondary">@{review.name}</h4>
          </div>
          <h4 className="font-bold">{review.rating}/10</h4>
        </div>
        {profileReview && (
          <Link to={`/${review.movieId}`} className="hover:lg:text-primary">
            <h3>{review.title}</h3>
          </Link>
        )}
        <p className="col-span-full">{review.review}</p>
        <div className="flex gap-2 justify-between pt-2">
          <button>
            <p>Read Full Review Here</p>
          </button>
          <p>{review.date}</p>
        </div>
      </div>
    </div>
  )
}

export default Review
