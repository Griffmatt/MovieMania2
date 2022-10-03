import { signUserIn } from '../fireBaseHooks/signUserIn'
import { useUserContext } from '../context/userContext'
import { SyntheticEvent, useState } from 'react'
import { useModalContext } from '../context/modalContext'

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function LoginForm({ setTitle }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSetUser } = useUserContext()

  const { closeModal } = useModalContext()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    void signUserIn(email, password, handleSetUser, closeModal)
  }
  const loginTestUser = (event: SyntheticEvent) => {
    event.preventDefault()
    void signUserIn(
      'testuser@testuser.com',
      'testuser',
      handleSetUser,
      closeModal
    )
  }
  return (
    <form
      className="items-center text-center grid gap-8"
      aria-modal="true"
      role="dialog"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Enter Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="enter Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <button
          className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
          type="submit"
        >
          Login
        </button>
        <button
          className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
          onClick={() => setTitle('Sign Up')}
        >
          Sign Up
        </button>
        <button
          className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
          onClick={loginTestUser}
        >
          Test User Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
