import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import requests from '../shared/requests'
import instance from '../axios'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

import {Imovie} from "../ts/interfaces/movie"

function MovieBanner() {
    const [movies, setMovies] =useState<Imovie[]>([])
    const base_url = "https://image.tmdb.org/t/p/original"
    useEffect(() =>{
        async function fetchData(){
            const response = await instance.get(requests.fetchPopular);
            const filteredResponse = response.data.results.filter((movie: Imovie) => movie.title && movie.backdrop_path)
            setMovies(filteredResponse.slice(0, 5))
            return response
        }
        fetchData()
    }, [])

  return (
    <Carousel
        infiniteLoop={true}
        showStatus={false}
        autoPlay
        interval={10000}
        showArrows={false}
        transitionTime={500}
        showThumbs={false}
    >
        {movies.map((movie: Imovie, index: number)=>{
            return(
                <div className="movieBanner" key={index}>
                    <div>
                        <Link to={`/${movie.id}`}>
                            <h1>{movie.title}</h1>
                        </Link>
                        <img src={`${base_url}${movie.backdrop_path}`} alt={movie.title}/>
                    </div>
                    
                </div>
            )
        })}
    </Carousel>
  )
}

export default MovieBanner