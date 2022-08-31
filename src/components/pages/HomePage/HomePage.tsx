import React, { useState, useEffect } from "react";
import requests from "../../../shared/requests";
import MovieBanner from "./MovieBanner";
import MovieRow from "../../MovieRow";

import { fetchMovies } from "../../../apiCalls/fetchMovies";

import { Imovie } from "../../../typescript/interfaces/movie";

function HomePage() {
  const [selected, setSelected] = useState("Upcoming");
  const [request, setRequest] = useState("upcoming");
  const [movies, setMovies] = useState<Imovie[] | null>(null);

  useEffect(() => {
    fetchMovies(`/movie/${request}${requests.fetchMovies}`, setMovies);
  }, [request]);

  const options = [
    {
      name: "Upcoming",
      value: "upcoming",
    },
    {
      name: "Popular",
      value: "popular",
    },
    {
      name: "Top Rated",
      value: "top_rated",
    },
    {
      name: "Now Playing",
      value: "now_playing",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRequest(e.target.value);
    switch (e.target.value) {
      case "popular":
        setSelected("Popular");
        break;
      case "top_rated":
        setSelected("Top Rated");
        break;
      case "now_playing":
        setSelected("Now Playing");
        break;
      case "upcoming":
        setSelected("Upcoming");
        break;
      default:
        setSelected("Default");
    }
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
            <select name="selectSort" id="selectSort" onChange={handleChange}>
              {options.map((option, i) => {
                return (
                  <option value={option.value} key={i}>
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
