import LoadingComponent from './LoadingComponent'

function LoadingScreen() {
  return (
    <div className="bg-bg-primary dark:bg-bg-primary-dark h-screen w-screen fixed top-0 left-0 z-50">
      <LoadingComponent />
    </div>
  )
}

export default LoadingScreen
