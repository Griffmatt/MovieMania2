import Crew from './Crew'
import Cast from './Cast'

import YourReview from './YourReview'

import { formatMoney } from '../../../utils/formatMoney'
import { Imovie } from '../../../typescript/interfaces/movie'


interface Props{
  movie: Imovie;
}

function MovieInfo({movie}: Props) {


    const getGenre = () => {
        if (movie?.genres.length === 0) {
          return <p>Genres coming soon...</p>
        }
    
        return (
          <div className="genre">
            {movie?.genres.map((genre, i) => (
              <p key={i}>{genre.name}</p>
            ))}
          </div>
        )
      }
    
      const runTime = (runtime: number) =>
        runtime < 60
          ? `${runtime}m`
          : `${Math.trunc(runtime / 60)}h ${
              runtime - Math.trunc(runtime / 60) * 60
            }m`

  return (
    <div className="movieInfo">
        <h2>{movie.title}</h2>
        {getGenre()}
        <h4>OverView</h4>
        <p>{movie.overview}</p>
        <h5>
            {movie.release_date.slice(0,4)} - {runTime(movie.runtime)} -
            <span className="infoRating">
            {Math.trunc(movie.vote_average * 10) / 10}/10
            </span>
        </h5>
        <div className="crewAndReviewContainer">
            <div className="crewAndBudgetInfo">
            {movie.credits && <Crew crew={movie.credits.crew} />}
            <div className="budgetInfo">
                <div>
                <h4>Budget</h4>
                <p>{formatMoney(movie.budget)}</p>
                </div>
                <div>
                <h4>Revenue</h4>
                <p>{formatMoney(movie.revenue)}</p>
                </div>
            </div>
            </div>
            <YourReview movie={movie} />
        </div>
        {movie.credits && <Cast cast={movie.credits.cast} />}
        </div>
  )
}

export default MovieInfo