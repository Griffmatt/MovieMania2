import { useQuery } from '@tanstack/react-query'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { Iuser } from '../../typescript/interfaces/user'
import profileImage from '/Images/profileImage.png'

import { useFollow } from '../../hooks/useFollow'
import { useUnFollow } from '../../hooks/useUnfollow'
import { useNavigate } from 'react-router-dom'
import { getDocument } from '../../fireBaseUtils/getDocument'

interface Props {
  user?: Iuser | null
  userId?: string | null
  profileId: string
}

function ProfileHeader({ user, userId, profileId }: Props) {
  const { data: following, isLoading: isLoadingFollowing } = useQuery(
    ['following', userId],
    () => getDocument<{ following: string[] }>('following', userId)
  )
  const mutationFollow = useFollow(userId)
  const mutationUnFollow = useUnFollow(userId)

  const navigate = useNavigate()
  const handleLogOut = () => {
    navigate('/')
    void signOut(auth)
  }
  const handleClick = () => {
    if (userId == null) return
    if (isLoadingFollowing) return
    if (following?.following.includes(profileId)) {
      mutationUnFollow.mutate(profileId)
      return
    }
    mutationFollow.mutate(profileId)
  }

  return (
    <header className="flex justify-between p-4 h-36 md:h-48">
      <div className="w-fit grid gap-2">
        <div className="relative w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem]">
          <img
            src={profileImage}
            alt="Profile"
            className=" w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] absolute top-0 left-0"
          />
        </div>
        <div>
          <h3 className="font-bold">{user?.name}</h3>
          <p className="text-font-secondary">@{user?.userName}</p>
        </div>
        <p className="text-font-secondary">{user?.joinDate}</p>
      </div>
      {profileId === userId ? (
        <div className="flex flex-col justify-center">
          <button className="movie-info__button" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <button className="movie-info__button" onClick={handleClick}>
            {following?.following.includes(profileId) ? 'UnFollow' : 'Follow'}
          </button>
        </div>
      )}
    </header>
  )
}

export default ProfileHeader
