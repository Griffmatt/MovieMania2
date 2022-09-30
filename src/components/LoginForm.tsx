interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

function LoginForm({ setTitle }: Props) {
  return (
    <form
      className="items-center text-center grid gap-8"
      aria-modal="true"
      role="dialog"
    >
      <div className="grid gap-3">
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="UserName"
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Password"
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
      </div>
    </form>
  )
}

export default LoginForm
