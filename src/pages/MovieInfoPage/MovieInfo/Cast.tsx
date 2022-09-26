import { useState, useRef } from 'react'
import { Iactor } from '../../../typescript/interfaces/castAndCrew'

interface Props {
  cast: Iactor[]
}

function Cast({ cast }: Props) {
  const castNumber = 11

  const castRef = useRef<HTMLDivElement | null>(null)
  const [shownCast, setShownCast] = useState(castNumber)
  const base_url = 'https://image.tmdb.org/t/p/w300'
  const starringCast = cast.filter((actor) => actor.profile_path)

  const handleShowCast = () => {
    castRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    shownCast === castNumber
      ? setShownCast(starringCast.length)
      : setShownCast(castNumber)
  }

  const StarringCast = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {starringCast.slice(0, shownCast).map((actor) => {
          return (
            <div key={actor.id} className="auto-cols-min w-full aspect-[2/3]">
              <img
                src={`${base_url}${actor.profile_path}`}
                alt={actor.name}
                className="rounded-xl"
              />
              <p className="pt-2 md:pt-0 overflow-ellipsis">
                <span className="font-semibold">{actor.name}</span>
                <br /> {actor.character}
              </p>
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
    <div ref={castRef}>
      {starringCast.length > 0 && (
        <>
          <h2 className="py-4">Starring</h2>
          <StarringCast />
        </>
      )}
    </div>
  )
}

export default Cast
