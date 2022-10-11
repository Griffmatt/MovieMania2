import { signUserIn } from '../fireBaseUtils/signUserIn'
import { useUserContext } from '../context/userContext'
import { SyntheticEvent, useRef } from 'react'
import { useModalContext } from '../context/modalContext'

interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function LoginForm({ setTitle }: Props) {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { handleSetUser } = useUserContext()

  const { closeModal } = useModalContext()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    void signUserIn(
      handleSetUser,
      closeModal,
      emailRef.current?.value,
      passwordRef.current?.value
    )
  }
  const loginTestUser = (event: SyntheticEvent) => {
    event.preventDefault()
    void signUserIn(
      handleSetUser,
      closeModal,
      'testuser@testuser.com',
      'testuser'
    )
  }
  return (
    <form
      className="items-center text-center grid gap-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <input
          type="email"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Enter Email"
          autoComplete="Email"
          ref={emailRef}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Enter Password"
          autoComplete="current-password"
          ref={passwordRef}
        />
      </div>
      <div className="grid gap-3">
        <button className="modal__button" type="submit">
          Login
        </button>
        <button className="modal__button" onClick={() => setTitle('Sign Up')}>
          Sign Up
        </button>
        <button
          className="modal__button rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
          onClick={loginTestUser}
        >
          Test User Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
