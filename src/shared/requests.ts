const API_KEY = '0f61def237ffa6f07320700ee78a6151'

const requests = {
  fetchPopular: `/movie/popular?api_key=${API_KEY}&language=en-us`,
  fetchMovies: `?api_key=${API_KEY}&language=en-us&include_adult=false`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&query=`,
  fetchMovieInfo: `?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,images&include_image_language=en`,
  fetchByGenre: `/discover/movie?api_key=${API_KEY}&with_genres=`,
  postRating: `?api_key=${API_KEY}`,
}

export default requests
