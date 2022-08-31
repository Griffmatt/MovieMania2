import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorite } from "../redux/favoriteSlice";

import { handleFavoritesCheck } from "../utils/handleFavoritesCheck";
import { handleFavoritesClick } from "../utils/handleFavoritesClick";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Imovie } from "../typescript/interfaces/movie";

function MovieRow({ movies }: { movies: Imovie[]}) {
  const base_url = "https://image.tmdb.org/t/p/w300";
  const favorites = useSelector(selectFavorite);
  const dispatch = useDispatch();

  const [moviesRef] = useAutoAnimate<HTMLDivElement>()

  const movieQuality = (vote_average: number) => {
    if(vote_average > 9) return "greatMovie"
    if(vote_average > 7.5) return "goodMovie"
    if(vote_average > 5) return "averageMovie"
    return "badMovie"
  }

  return (
    <div className="movieRowContainer">
      <div className="movieRowGrid" ref={moviesRef}>
        {movies.map((movie: Imovie, index) => {
          return (
            <div key={index} className="moviePoster">
              <input
                className="star"
                type="checkbox"
                onClick={() => handleFavoritesClick(movie, favorites, dispatch)}
                checked={handleFavoritesCheck(movie, favorites)}
                readOnly
              />
              <Link to={`/${movie.id}`}>
                <div
                  className={`movieRating ${movieQuality(movie.vote_average)}`}
                >
                  {movie.vote_average === 0 ? "" : movie.vote_average}
                </div>
                <img
                  src={`${base_url}${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieRow;
