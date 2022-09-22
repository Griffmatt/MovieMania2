import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { Imovie, Iimage, Iresults } from '../../typescript/interfaces/movie'

interface Props {
  images: Iimage[]
  movie: Imovie
  videos?: Iresults[]
}

function MovieMedia({ images, movie, videos }: Props) {
  const trailer = videos?.find((video) => video.name.includes('Trailer'))

  const MovieImages = () => {
    return (
      <div className="w-full  md:w-[28rem] xl:w-[30rem] grid gap-2">
        <h2>Images</h2>
        <Carousel showThumbs={false} infiniteLoop={true} key={movie.title}>
          {images?.map((image: Iimage, index: number) => {
            return (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt={movie.title}
                className="w-full aspect-video"
              />
            )
          })}
        </Carousel>
      </div>
    )
  }

  const MovieTrailer = () => {
    return (
      <div className=" w-full md:w-[28rem] xl:w-[30rem] grid gap-2">
        <h2>Trailer</h2>
        <iframe
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          src={`https://www.youtube.com/embed/${trailer?.key}?rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>
    )
  }

  return (
    <div className="flex items-center flex-col lg:flex-row lg:justify-between ">
      {images.length > 0 && <MovieImages />}
      {trailer && <MovieTrailer />}
    </div>
  )
}

export default MovieMedia
