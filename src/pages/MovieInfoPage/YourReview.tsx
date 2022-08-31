import {useState, useEffect} from 'react'
import { Rating } from 'react-simple-star-rating'
import{ useDispatch, useSelector } from 'react-redux'
import { addReview, removeReview, selectReview} from '../../redux/reviewSlice'

import {Ireview} from "../../typescript/interfaces/review"
import {Imovie} from "../../typescript/interfaces/movie"

interface Props{
  movie: Imovie;
}



function YourReview({movie}: Props) {

    const [rating, setRating] = useState(0)
    const [review, setReview] = useState("")

    const [submitted, setSubmitted] = useState(false)

 
  const dispatch = useDispatch()
  const reviews = useSelector(selectReview)

  useEffect(() => {
    let filteredReview = reviews.filter((review: Ireview) => review.title === movie.title)
    if(filteredReview.length === 1){
    setRating(filteredReview[0].rating)
    setReview(filteredReview[0].review)
    setSubmitted(true)
    }
  },[] );

  const handleAddReview = (movie: Imovie) =>{
    setSubmitted(true)
      let filteredReviews = reviews.filter((review: Ireview) => review.title === movie.title)
      if(filteredReviews.length > 0){
          dispatch(removeReview(movie.title))
      }
      dispatch(addReview({title: movie.title, rating: rating, review: review, id: movie.id}))

  }

  const handleRating = (rate: number) => {
    setRating(rate/10)
  }

  return (
    <div className="yourReview">
      {submitted?
      <>
        <div className="wrapper"> 
          <h4>Your Review Was Submitted</h4>
          <div>
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
              <circle className="checkmarkCircle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmarkCheck" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <p onClick={()=> setSubmitted(false)}>Edit Your Review</p>
          </div>
        </div>
      </>
      :
      <>
        <h4>Write A Review</h4>
        <form>
            <Rating initialValue={rating} ratingValue={rating} allowHalfIcon={true} allowHover={false} fillColor={"rgb(206, 174, 34)"} emptyColor={"rgb(122, 122, 122)"} iconsCount={10} onClick={handleRating} size={30} transition={true}/>
            <textarea rows={4} placeholder="What did you think of this movie?(optional)" onChange={(event)=>setReview(event.target.value)} defaultValue={review}/>
            <button onClick={()=> handleAddReview(movie)} type="button">Submit</button><button type="button">Login to Submit</button>
        </form>
      </>}
    </div>
  )
}

export default YourReview;