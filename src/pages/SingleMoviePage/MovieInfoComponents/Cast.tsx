import { useState } from 'react'
import { Iactor } from '../../../typescript/interfaces/castAndCrew'

interface Props {
  cast: Iactor[]
}

function Cast({ cast }: Props) {
  const castNumber = 19

  const [shownCast, setShownCast] = useState(castNumber)
  const base_url = 'https://image.tmdb.org/t/p/w300'
  const starringCast = cast.filter((actor) => actor.profile_path)

  const handleShowCast = () => {
    shownCast === castNumber
      ? setShownCast(starringCast.length)
      : setShownCast(castNumber)
  }

  const StarringCast = () => {
    return (
      <div className="flex w-[calc(100vw-2.5rem)] md:w-[calc(83.33333333333333333333vw-2.5rem)] lg:w-full no-scrollbar overflow-x-scroll lg:grid lg:grid-cols-10 gap-3">
        {starringCast.slice(0, shownCast).map((actor) => {
          return (
            <div key={actor.id}>
              <div className="w-32 lg:w-full">
                <img
                  src={`${base_url}${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-xl w-full aspect-[2/3]"
                />
              </div>
              <div>
                <p className="pt-2 w-full md:pt-0 overflow-ellipsis">
                  <span className="font-semibold">{actor.name}</span>
                  <br /> {actor.character}
                </p>
              </div>
            </div>
          )
        })}
        {starringCast.length > castNumber ? (
          <button onClick={handleShowCast} className="w-full aspect-[4/5]">
            <h3>Toggle Cast</h3>
          </button>
        ) : (
          <></>
        )}
      </div>
    )
  }

  return (
    <>
      {starringCast.length > 0 && (
        <div>
          <h2 className="py-4">Starring</h2>
          <StarringCast />
        </div>
      )}
    </>
  )
}

export default Cast
