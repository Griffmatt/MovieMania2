import { useState, useEffect } from "react"

import MovieMedia from "./MovieMedia"
import requests from "../../shared/requests"
import Crew from "./Crew"
import Cast from "./Cast"
import Reviews from "./Reviews"
import YourReview from "./YourReview"
import FavoritedIcon from "../../components/ui/FavoritedIcon"

import { useFetchMovies } from "../../hooks/fetchMovies"
import { formatMoney } from "../../utils/formatMoney"

import { Imovie, Iresults, Iimage } from "../../typescript/interfaces/movie"
import { Icredits } from "../../typescript/interfaces/castAndCrew"

function MovieInfoPage({ id }: {id?: string}) {
  const base_url = "https://image.tmdb.org/t/p/w500"

  const [credits, setCredits] = useState<Icredits>()
  const [images, setImages] = useState<Iimage[]>()
  const [genre, setGenre] = useState<{ name: string }[]>()
  const [movieYear, setMovieYear] = useState<string>()
  const [videos, setVideos] = useState<Iresults[]>()

  const movie = useFetchMovies<Imovie | null>(`https://api.themoviedb.org/3/movie/${id}${requests.fetchMovieInfo}`)

  useEffect(() => {
    window.scrollTo(0, 0);
      setCredits(movie?.credits)
      setImages(movie?.images.backdrops.slice(0, 5))
      setGenre(movie?.genres)
      setMovieYear(movie?.release_date)
      setVideos(movie?.videos.results)
  }, [id]);

  const getGenre = () => {
    if (genre?.length === 0) {
      return <p>Genres coming soon...</p>
    }

    return (
      <div className="genre">
        {genre?.map((genre, i) => (
          <p key={i}>{genre.name}</p>
        ))}
      </div>
    );
  };

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
                  <FavoritedIcon movie={movie}/>
                  <img
                      src={`${base_url}${movie.poster_path}`}
                      alt={movie?.title}
                    />
                </div>
              </div>
              <div className="movieInfo">
                <h2>{movie.title}</h2>
                {getGenre()}
                <h4>OverView</h4>
                <p>{movie.overview}</p>
                <h5>
                  {movieYear} - {runTime(movie.runtime)} -
                  <span className="infoRating">
                    {Math.trunc(movie.vote_average * 10) / 10}/10
                  </span>
                </h5>
                <div className="crewAndReviewContainer">
                  <div className="crewAndBudgetInfo">
                    {credits && <Crew crew={credits.crew} />}
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
                {credits && <Cast cast={credits.cast} />}
              </div>
            </div>
            <MovieMedia images={images} movie={movie} videos={videos} />
            <Reviews />
          </div>
        </div>
      )}
    </>
  )
}

export default MovieInfoPage
