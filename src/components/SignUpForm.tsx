import { SyntheticEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function SignUpForm() {
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (password !== password2) {
      console.log('passwords do not match')
      return
    }
    console.log('passwords match')
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
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="UserName"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Reenter Password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
      </div>
      <button
        className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
        type="submit"
      >
        Create Account
      </button>
    </form>
  )
}

export default SignUpForm
