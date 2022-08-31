import {Iactor} from "../../typescript/interfaces/actor"

interface Props{
    cast: Iactor[]
}

function Cast({cast}: Props) {

    const base_url = "https://image.tmdb.org/t/p/w200"
    
    const getStarringCast = (cast: Iactor[]) =>{
        const starringCast = cast.filter(actor => actor.profile_path)

        return(
            <div className="starringCastInfo">
                {starringCast.map(actor =>{
                    return(
                        <div key={actor.id}>
                            <img src={`${base_url}${actor.profile_path}`} alt={actor.name}/>
                            <h6>{actor.name}</h6> 
                            <p>{actor.character}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

  return (
    <div className="starringCastInfoContainer">
        <h4>Starring</h4>
        {getStarringCast(cast)}
    </div>
  )
}

export default Cast