function LoadingScreen() {
  return (
    <div className="bg-bg-primary dark:bg-bg-primary-dark h-screen w-screen fixed top-0 left-0 z-50">
      <div className="flex justify-center items-center animate-pulse h-screen">
        <h1 className="text-primary font-extrabold text-9xl">M</h1>
      </div>
    </div>
  )
}

export default LoadingScreen
