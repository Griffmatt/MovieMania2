import { useState, useEffect, useRef} from "react";
import requests from "../../shared/requests";
import MovieBanner from "./MovieBanner";
import MovieRow from "../../components/MovieRow";

import { fetchMovies } from "../../apiCalls/fetchMovies";
import { movieOptions } from "../../shared/movieOptions"

import { Imovie } from "../../typescript/interfaces/movie";

function HomePage() {
  const [selected, setSelected] = useState("Upcoming");
  const [request, setRequest] = useState("upcoming");
  const [movies, setMovies] = useState<Imovie[] | null>(null);

  let optionMap = useRef(new Map())

  useEffect(() => {
    fetchMovies(`/movie/${request}${requests.fetchMovies}`, setMovies);
  }, [request]);

  useEffect(() => {
    movieOptions.forEach((option: {name: string, value: string})=>{
      optionMap.current.set(option.value, option.name)
    } )
  }, []);

  const handleChange = (value: string) => {
    setRequest(value);
    setSelected(optionMap.current.get(value))
  };

  return (
    <>
      <MovieBanner />
      <div className="shownMovies">
        <div className="shownMoviesRow">
          <h1>
            <span className="movieSelectionTitle">{selected}</span> Movies
          </h1>
          <form>
            <select name="selectSort" id="selectSort" onChange={event => handleChange(event.target.value)}>
              {movieOptions.map((option, index) => {
                return (
                  <option value={option.value} key={index}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
      </div>
      {movies && <MovieRow movies={movies} />}
    </>
  );
}

export default HomePage;
