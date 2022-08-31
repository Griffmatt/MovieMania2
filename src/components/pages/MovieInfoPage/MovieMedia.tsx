import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import {Imovie} from "../../../typescript/interfaces/movie"

interface Video{
  name: string;
  key: string;
}

interface Image{
  file_path: string;
}

interface Props{
  images: Image[];
  movie: Imovie;
  videos?: Video[];
}

function MovieMedia({images, movie, videos}: Props) {

  const trailer = videos?.find((video) => video.name.includes("Trailer"));
  
  const movieImages = () =>{
    return(
      <div className="movieImageContainer">
        <h4>Images</h4>
        <hr/>
        <Carousel showThumbs={false} infiniteLoop={true} key={movie.title}>
          {images.map((image: Image, index: number) =>{
            return(
              <img key={index} src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={movie.title} className="movieImages"/>
            )
          })}
        </Carousel>
      </div>
    )
  }

  const movieTrailer = () =>{
    return(
      trailer?<div className="movieImageContainer">
        <h4>Trailer</h4>
        <hr/>
          <iframe
            width="600"
            height="337.19"
            src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="movieTrailer"
          ></iframe>
      </div>:""
    )
  }

  return (
    <div className="movieMediaContainer">
      {images.length === 0? "":movieImages()}
      {movie.backdrop_path? movieTrailer(): ""}
    </div>
  )
}

export default MovieMedia;