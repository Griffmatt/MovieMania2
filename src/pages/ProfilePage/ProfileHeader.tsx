import { Iuser } from '../../typescript/interfaces/user'

interface Props {
  user: Iuser
}

function ProfileHeader({ user }: Props) {
  return (
    <header className="flex justify-between p-4">
      <div className="w-fit grid gap-2">
        <div className="relative w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]">
          <img
            src="images/profileImage.png"
            alt="Profile"
            className=" w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] absolute top-0 left-0"
          />
        </div>
        <div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-font-secondary">@{user.userName}</p>
        </div>
        <p className="text-font-secondary">{user.joinDate}</p>
      </div>
      <div className="flex flex-col justify-center"></div>
    </header>
  )
}

export default ProfileHeader
