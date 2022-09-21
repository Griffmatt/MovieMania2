import { useUserContext } from '../../context/userContext'

function ProfileHeader({ reviews }: { reviews: number }) {
  const { user } = useUserContext()
  return (
    <header className="flex justify-between">
      <div className="w-fit grid gap-2">
        <img src={user.image} alt="Profile" className="w-[6rem]" />
        <div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{user.userName}</p>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{user.joinDate}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h2>{reviews} Reviews</h2>
      </div>
    </header>
  )
}

export default ProfileHeader
