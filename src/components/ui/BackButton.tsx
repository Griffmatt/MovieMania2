import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      className=" font-bold cursor-pointer hover:text-font-secondary h-fit"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  )
}

export default BackButton
