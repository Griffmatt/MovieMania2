import { Icrew } from '../../typescript/interfaces/castAndCrew'

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
        <div className="crew">
          {results.map((result, i) => (
            <p key={i} className="crewMember">
              {result.name}
            </p>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className="crewAndBudgetInfo">
      <div className="crewInfo">
        <div>{crew && getCrewInfo('Director')}</div>
        <div>{crew && getCrewInfo('Producer')}</div>
        <div>{crew && getCrewInfo('Screenplay')}</div>
      </div>
    </div>
  )
}

export default Crew
