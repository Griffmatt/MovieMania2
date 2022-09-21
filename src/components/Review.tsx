import profileImage from '/Images/profileImage.png'
import { Ireview } from '../typescript/interfaces/review'

function Review({ review }: { review: Ireview }) {
  return (
    <div className="min-w border-2 p-5 rounded-xl shadow">
      <div className="flex gap-3">
        <img src={profileImage} alt="Profile" className="w-10 h-10" />
        <div className="grid gap-1">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center h-fit">
              <h4 className="font-bold">{review.name}</h4>
              <h4 className="text-gray-600">@{review.name}</h4>
            </div>
            <h4 className="font-bold">{review.rating}/10</h4>
          </div>
          <p className="col-span-full">{review.review}</p>
          <div className="flex gap-2 justify-end">
            <p>{review.date}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
