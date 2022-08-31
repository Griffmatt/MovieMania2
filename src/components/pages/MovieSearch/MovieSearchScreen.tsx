import {useState, useEffect} from 'react'
import MovieRow from '../../components/MovieRow'
import requests from '../../shared/requests'
import { fetchMovies } from "../../apiCalls/fetchMovies";

import { Imovie } from "../../typescript/interfaces/movie"

function MovieSearch() {

  const [searchFor, setSearchFor]= useState('a')
  const [movies, setMovies] = useState<Imovie[] | null>(null)

  let timer: number

  const handleChange = (value: string) => {
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      setSearchFor(value?value:"a")
    }, 700);
  }

  useEffect(() => {
    fetchMovies(`${requests.fetchSearch}${searchFor}`, setMovies);
  }, [searchFor]);

  return (
    <>
      <input type="search" placeholder="Search For a Movie..." className="searchBar" onChange={event=> handleChange(event.target.value)}/>
      {movies && <MovieRow movies={movies}/>}
    </>
  )
}

export default MovieSearch