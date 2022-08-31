import MovieRow from '../../MovieRow'

function FavoritedMovies() {
  return (
    <>
        <h1><span className="movieSelectionTitle">Favorited</span> Movies</h1>
        <MovieRow request="None"/>
    </>
  )
}

export default FavoritedMovies