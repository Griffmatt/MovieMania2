import { useEffect } from 'react'

import MovieMedia from './MovieMedia'
import requests from '../../shared/requests'
import Crew from './Crew'
import Cast from './Cast'
import Reviews from './Reviews'
import YourReview from './YourReview'
import FavoritedIcon from '../../components/ui/FavoritedIcon'

import useFetchMovies from '../../hooks/useFetchMovies'
import { formatMoney } from '../../utils/formatMoney'

import { Imovie } from '../../typescript/interfaces/movie'

function MovieInfoPage({ id }: { id?: string }) {
  const base_url = 'https://image.tmdb.org/t/p/w500'

  const movie = useFetchMovies<Imovie>(`/movie/${id}${requests.fetchMovieInfo}`)


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

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
    <>
      {movie && (
        <div className="movieCardContainer">
          <div className="movieCardRow">
            <div className="movieCard">
              <div key={movie.title} className="movieCardPoster">
                <div className="movieImage">
                  <FavoritedIcon movie={movie} />
                  <img
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </div>
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
            </div>
            <MovieMedia images={movie.images.backdrops} movie={movie} videos={movie.videos.results} />
            <Reviews />
          </div>
        </div>
      )}
    </>
  )
}

export default MovieInfoPage
