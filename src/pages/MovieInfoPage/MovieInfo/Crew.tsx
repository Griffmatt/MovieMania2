import { Icrew } from '../../../typescript/interfaces/castAndCrew'

interface Props {
  crew: Icrew[]
}

function Crew({ crew }: Props) {
  const getCrewInfo = (position: string) => {
    const results = crew.filter((person) => person.job === position)

    if (results.length === 0) {
      return (
        <>
          <h4>{position}</h4>
          <p>coming soon...</p>
        </>
      )
    }

    return (
      <>
        <h4>{position}</h4>
        <div className="flex gap-2 flex-wrap">
          {results.map((result) => (
            <p key={result.name} className="">
              {result.name}
            </p>
          ))}
        </div>
      </>
    )
  }
  return (
    <>
      <div>{getCrewInfo('Director')}</div>
      <div>{getCrewInfo('Producer')}</div>
      <div>{getCrewInfo('Screenplay')}</div>
    </>
  )
}

export default Crew
