import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../fireBaseUtils/fetchUsers'
import { Iuser } from '../../typescript/interfaces/user'
import profileImage from '/Images/profileImage.png'

interface Props {
  user?: Iuser | null
}

function HomeSideInfo({ user }: Props) {
  const { data: users, isLoading } = useQuery(['users'], () => fetchUsers(user))
  return (
    <div className="p-4 bg-bg-secondary dark:bg-bg-secondary-dark rounded-2xl grid gap-4">
      {isLoading ? (
        <></>
      ) : (
        <>
          <h4 className="text-primary">Suggested Users</h4>
          {users?.map((userInfo) => {
            return (
              <Link to={`/profile/${userInfo.uid}`} key={userInfo.uid}>
                <div className="flex gap-2 lg:gap-4">
                  <img
                    className="h-6"
                    src={profileImage}
                    alt={`${userInfo.userName}`}
                  />
                  <div className="flex flex-col xl:gap-2 xl:flex-row xl:items-end ">
                    <h5>{userInfo.name}</h5>
                    <p>@{userInfo.userName}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </>
      )}
    </div>
  )
}

export default HomeSideInfo
