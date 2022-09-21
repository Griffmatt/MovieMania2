import { Icrew } from '../../../typescript/interfaces/castAndCrew'

interface CrewProps {
  crew: Icrew[]
}
interface CrewInfoProps {
  position: string
}

function Crew({ crew }: CrewProps) {
  const CrewInfo = ({ position }: CrewInfoProps) => {
    const results = crew.filter((person) => person.job === position)

    if (results.length === 0) {
      return (
        <div>
          <h3>{position}</h3>
          <p>coming soon...</p>
        </div>
      )
    }

    return (
      <div>
        <h3>{position}</h3>
        <div className="flex gap-2 flex-wrap">
          {results.map((result, index) => (
            <p key={result.name}>
              {result.name}
              {index !== results.length - 1 ? ',' : ''}
            </p>
          ))}
        </div>
      </div>
    )
  }
  return (
    <>
      <CrewInfo position="Director" />
      <CrewInfo position="Producer" />
      <CrewInfo position="Screenplay" />
    </>
  )
}

export default Crew
