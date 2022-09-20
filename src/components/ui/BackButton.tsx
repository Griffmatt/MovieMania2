import { useNavigate } from 'react-router-dom'

function BackButton() {
  const navigate = useNavigate()
  return (
    <h1
      className="cursor-pointer hover:text-gray-400 h-fit"
      onClick={() => navigate(-1)}
    >
      Back
    </h1>
  )
}

export default BackButton
