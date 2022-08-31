import profileImage from "/Images/profileImage.png"
import {reviews} from "../../../shared/reviewsArray"
import { Ireview } from '../../../typescript/interfaces/review'

function Reviews() {
  return (
    <div className="reviewContainer">
        <h4>Recent Reviews</h4>
        <div className="reviews">
            {reviews.map((review: Ireview, index) =>{
                return(
                    <div key={index}>
                        <h5><img src={profileImage} alt={"Profile"}/> {review.name}</h5>
                        <div className="review">
                            <div><h5>{review.rating}/10</h5><h5>{review.date}</h5></div>
                            <p>{review.review}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Reviews;
