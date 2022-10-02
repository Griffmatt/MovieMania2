import { Imovie } from '../../../typescript/interfaces/movie'
import { useUserContext } from '../../../context/userContext'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import db from '../../../firebase'

function WatchListButton({ movie }: { movie: Imovie }) {
  const { user } = useUserContext()
  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (user === null) return
    const docRef = doc(db, 'watch-list', user.uid)
    const updateReviewDoc = async () => {
      await updateDoc(docRef, {
        watchList: arrayUnion(movie),
      })
    }
    void updateReviewDoc()
  }

  return (
    <button className="movie-info__button" onClick={handleClick}>
      <h5>Watch List</h5>
    </button>
  )
}

export default WatchListButton
