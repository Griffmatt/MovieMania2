function LoginModal() {
  return (
    <>
      <div className="transition-height h-full w-full flex justify-center overflow-hidden fixed top-0 left-0 backdrop-blur-sm bg-bg-primary-dark/50 dark:bg-bg-primary/10 z-20">
        <div
          className="bg-bg-primary dark:bg-bg-primary-dark rounded-xl w-[90%]  md:w-[60%] lg:w-[40%] xl:w-[20%] h-min z-30 p-8 relative top-[15%]"
          aria-hidden="true"
        >
          <form
            className="flex flex-col items-center gap-6 text-center"
            aria-modal="true"
            role="dialog"
          >
            <h2 className="text-xl">Login</h2>
            <input
              type="text"
              className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
              placeholder="Enter User Name"
            />
            <input
              type="password"
              className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
              placeholder="Enter Password"
            />
            <div className="flex gap-5 w-full">
              <button
                className="rounded w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
                type="submit"
              >
                Login
              </button>
              <button
                className="rounded w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginModal
