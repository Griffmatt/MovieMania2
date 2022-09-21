import { Iactor } from '../../../typescript/interfaces/castAndCrew'

interface Props {
  cast: Iactor[]
}

function Cast({ cast }: Props) {
  const base_url = 'https://image.tmdb.org/t/p/w300'
  const starringCast = cast.filter((actor) => actor.profile_path)

  const StarringCast = () => {
    return (
      <div className="pt-2 flex gap-4 flex-wrap flex-col md:flex-row">
        {starringCast.map((actor) => {
          return (
            <div
              key={actor.id}
              className="flex gap-3 md:flex-col md:w-28 md:min-w-0"
            >
              <img
                src={`${base_url}${actor.profile_path}`}
                alt={actor.name}
                className="rounded-xl w-28"
              />
              <p className="pt-2 md:pt-0 overflow-ellipsis">
                <span className="font-semibold">{actor.name}</span>
                <br /> {actor.character}
              </p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {starringCast.length > 0 && (
        <>
          <h2>Starring</h2>
          <StarringCast />
        </>
      )}
    </div>
  )
}

export default Cast
