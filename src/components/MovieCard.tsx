import Crew from './Crew'
import MovieMedia from './MovieMedia'

import {Imovie} from "../ts/interfaces/movie"
import {Icrew} from "../ts/interfaces/crew"

interface Props {
  movie: Imovie;
  images: {file_path: string}[];
  crew: Icrew[];
  genre: {name: string}[];
  movieYear: string;
}


function MovieCard({movie, images, crew, genre, movieYear}: Props) {
  const base_url = "https://image.tmdb.org/t/p/w500"

  let runTime = `${movie.runtime/60}h ${movie.runtime-(movie.runtime/60)*60}m`

  const getGenre = ()=> {
    
    if (genre.length === 0) {
      return <p>Genres coming soon...</p>;
    }

    return (
      <div className="genre">
        {genre.map((genre: {name: string}, index: number) => (
        <p key={index} >
          {genre.name}
        </p>))}
      </div>
    )
  }

  
  return (
    <div className="movieCardContainer">
            <div className="movieCardRow">
            <div className="movieCard">
            <div key={movie.title} className="movieCardPoster">
              <div className="movieImage">
                <input className="star" type="checkbox"/>
                <img src={`${base_url}${movie.poster_path}`} alt={movie.title}/>
                </div>
              </div>
              <div className="movieInfo">
                  <h4>Title</h4>
                  <h2>{movie.title}</h2>
                  {genre && getGenre()}
                  <h4>Description</h4>
                  <p>{movie.overview}</p>
                  <h5>{movieYear} - {runTime} -<span className='infoRating'>{movie.vote_average}/10</span></h5>
                  <Crew crew={crew}/>
              </div>
          </div>
          <MovieMedia images={images} movie={movie}/>
          </div>
    </div>
  )
}

export default MovieCard;