import profileImage from '/Images/profileImage.png'
import { Ireview } from '../../typescript/interfaces/review'

function Review({ review }: { review: Ireview }) {
  return (
    <div className="grid gap-4 min-w border-2 p-5 rounded-xl shadow">
      <div className="flex gap-2">
        <img src={profileImage} alt="Profile" className="w-10 h-10" />
        <div>
          <h5>{review.name}</h5>
          <p>@{review.name}</p>
        </div>
      </div>
      <p className="col-span-full">{review.review}</p>
      <div className="flex gap-2">
        <p className="font-bold">{review.rating}/10</p>
        <p>{review.date}</p>
      </div>
    </div>
  )
}

export default Review
