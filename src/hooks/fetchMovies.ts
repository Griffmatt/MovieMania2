import axios from "axios";
import { useEffect, useState } from "react";
import { Imovie } from "../typescript/interfaces/movie";



export function useFetchMovies<T>(request: string){
  const [movies, setMovies] = useState<T | null>(null)

  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  

  useEffect(()=>{
    async function fetchMovies(){
      try{const response = await axios.get(`https://api.themoviedb.org/3${request}`) 
        setMovies(response.data.results.filter((movie: Imovie) => movie.poster_path))
      return response}
      catch{
        console.log("error")
      }
    }
    fetchMovies()
    return () => {source.cancel()}
  }, [request])

  return movies
}
