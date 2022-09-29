function LoginModal() {
  return (
    <>
      <div className="transition-height h-full w-full flex justify-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20">
        <div
          className="bg-bg-primary dark:bg-bg-primary-dark rounded-xl w-[19rem] h-min z-30 p-8 relative top-[15%]"
          aria-hidden="true"
        >
          <h2 className="text-2xl w-full text-left">Login</h2>
          <form
            className="flex flex-col items-center gap-4 text-center"
            aria-modal="true"
            role="dialog"
          >
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
            <button
              className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
              type="submit"
            >
              Login
            </button>
            <button
              className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginModal
