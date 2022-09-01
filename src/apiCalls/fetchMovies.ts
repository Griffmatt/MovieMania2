import instance from "../axios";
import { Imovie } from "../typescript/interfaces/movie";

export async function fetchMovies<T>(request: string,  setMovies: T){
    const response = await instance.get(request);
    setMovies(response.data.results.filter((movie: Imovie) => movie.poster_path));
    return response;
  }