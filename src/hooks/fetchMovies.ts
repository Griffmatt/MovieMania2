import axios from "axios";
import { useEffect, useState } from "react";
import { Imovie } from "../typescript/interfaces/movie";



export function useFetchMovies(request: string): Imovie[] | null {
  const [movies, setMovies] = useState<Imovie[] | null>(null)

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()

  useEffect(()=>{
    async function fetchMovies(){
      const response = await axios.get(`https://api.themoviedb.org/3${request}`) 
        setMovies(response.data.results.filter((movie: Imovie) => movie.poster_path))
      return response;
    }
    fetchMovies()

    return () => {source.cancel}
  }, [request])
  return movies
}
