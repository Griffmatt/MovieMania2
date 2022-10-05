import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { Iuser } from '../../typescript/interfaces/user'
import profileImage from '/Images/profileImage.png'

interface Props {
  user: Iuser
  userId: string
}

function ProfileHeader({ user, userId }: Props) {
  const handleLogOut = () => {
    void signOut(auth)
  }
  return (
    <header className="flex justify-between p-4">
      <div className="w-fit grid gap-2">
        <div className="relative w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]">
          <img
            src={profileImage}
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
      {userId === user.uid ? (
        <div className="flex flex-col justify-center">
          <button className="movie-info__button" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      ) : (
        <></>
      )}
    </header>
  )
}

export default ProfileHeader
