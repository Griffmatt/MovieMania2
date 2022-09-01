import { useEffect, useState } from "react";
import instance from "../axios";
import { Imovie } from "../typescript/interfaces/movie";



export function useFetchMovies(request: string): Imovie[] | null {
  const [movies, setMovies] = useState<Imovie[] | null>(null)

  useEffect(()=>{
    async function fetchMovies(){
      const response = await instance.get(request);
      console.log(response.data.results)
      setMovies(response.data.results.filter((movie: Imovie) => movie.poster_path));
      return response;
    }
    fetchMovies()
  }, [request])
  return movies
}
