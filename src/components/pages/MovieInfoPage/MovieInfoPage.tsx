import { useState, useEffect } from "react";
import instance from "../../../axios";
import MovieMedia from "./MovieMedia";
import requests from "../../../shared/requests";
import Crew from "./Crew";
import Cast from "./Cast";
import Reviews from "./Reviews";
import YourReview from "./YourReview";

import { useDispatch, useSelector } from "react-redux";
import { selectFavorite } from "../../../redux/favoriteSlice";

import { handleFavoritesCheck } from "../../../utils/handleFavoritesCheck";
import { handleFavoritesClick } from "../../../utils/handleFavoritesClick";
import { fetchMovies } from "../../../apiCalls/fetchMovies";

import { Imovie } from "../../../typescript/interfaces/movie";
import { Icrew } from "../../../typescript/interfaces/crew";
import { Iactor } from "../../../typescript/interfaces/actor";

interface Props {
  id?: string;
}

function MovieInfoPage({ id }: Props) {
  const base_url = "https://image.tmdb.org/t/p/w500";

  const [movie, setMovie] = useState<Imovie | null>(null);
  const [cast, setCast] = useState<Iactor[]>([]);
  const [images, setImages] = useState([]);
  const [crew, setCrew] = useState<Icrew[]>([]);
  const [genre, setGenre] = useState<{ name: string }[]>([]);
  const [movieYear, setMovieYear] = useState("");
  const [videos, setVideos] = useState([]);

  const favorites = useSelector(selectFavorite);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const response = await instance.get(
        `/movie/${id}${requests.fetchMovieInfo}`
      );
      setMovie(response.data);
      setCast(response.data.credits.cast);
      setCrew(response.data.credits.crew);
      setImages(response.data.images.backdrops);
      setGenre(response.data.genres);
      setMovieYear(response.data.release_date.slice(0, 4));
      setVideos(response.data.videos.results);

      return response;
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies(`/movie/${id}${requests.fetchMovieInfo}`, setMovie);
  }, [id]);

  const getGenre = () => {
    if (genre.length === 0) {
      return <p>Genres coming soon...</p>;
    }

    return (
      <div className="genre">
        {genre.map((genre, i) => (
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
        }m`;

  const formatMoney = (revenue: number) => {
    if (revenue === 0) return "N/A";
    return revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  return (
    <>
      {movie && (
        <div className="movieCardContainer">
          <div className="movieCardRow">
            <div className="movieCard">
              <div key={movie.title} className="movieCardPoster">
                <div className="movieImage">
                  <input
                    className="star"
                    type="checkbox"
                    onClick={() =>
                      handleFavoritesClick(movie, favorites, dispatch)
                    }
                    defaultChecked={handleFavoritesCheck(movie, favorites)}
                  />
                  <img
                    src={`${base_url}${movie.poster_path}`}
                    alt={movie?.title}
                  />
                </div>
              </div>
              <div className="movieInfo">
                <h2>{movie.title}</h2>
                {genre && getGenre()}
                <h4>OverView</h4>
                <p>{movie.overview}</p>
                <h5>
                  {movieYear} {runTime(movie.runtime)}{" "}
                  <span className="infoRating">
                    {Math.trunc(movie.vote_average * 10) / 10}/10
                  </span>
                </h5>
                <div className="crewAndReviewContainer">
                  <div className="crewAndBudgetInfo">
                    <Crew crew={crew} />
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
                <Cast cast={cast} />
              </div>
            </div>
            <MovieMedia images={images} movie={movie} videos={videos} />
            <Reviews />
          </div>
        </div>
      )}
    </>
  );
}

export default MovieInfoPage
