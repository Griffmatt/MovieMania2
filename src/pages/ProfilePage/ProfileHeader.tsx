import { useUserContext } from '../../context/userContext'

function ProfileHeader({ reviews }: { reviews: number }) {
  const { user } = useUserContext()
  return (
    <header className="flex justify-between">
      <div className="w-fit grid gap-2">
        <div className="relative w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]">
          <img
            src={user.image}
            alt="Profile"
            className=" w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] absolute top-0 left-0"
            loading="lazy"
          />
        </div>
        <div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-font-secondary">{user.userName}</p>
        </div>
        <p className="text-font-secondary">{user.joinDate}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h2>{reviews} Reviews</h2>
      </div>
    </header>
  )
}

export default ProfileHeader
