import instance from "../axios";
import { Imovie } from "../typescript/interfaces/movie";

export async function fetchMovies<F, S>(request: F,  setMovies: S){
    const response = await instance.get(request);
    setMovies(response.data.results.filter((movie: Imovie) => movie.poster_path));
    return response;
  }