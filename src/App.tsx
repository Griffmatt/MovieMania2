import NavBar from './components/NavBar'
import HomePage from './pages/HomePage/HomePage'
import MovieInfoPage from './pages/MovieInfoPage/MovieInfoPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import MovieSearchPage from './pages/MovieSearchPage/MovieSearchPage'
import SideBar from './components/SideBar'

import { Routes, Route } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react'
import { SearchContextProvider } from './context/searchForContext'

interface ThemeContext {
  darkMode: boolean
  setDarkMode: React.Dispatch<boolean>
}

export const ThemeContext = createContext({} as ThemeContext)

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
    <SearchContextProvider>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <div className="container mx-auto">
          <div className="flex">
            <SideBar />
            <div className="border-l-2 dark:border-gray-700 md:w-5/6">
              <NavBar />
              <div className="border-t-2 dark:border-gray-700">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/:id" element={<MovieInfoPage />} />
                  <Route path="/profile-page" element={<ProfilePage />} />
                  <Route
                    path="/search/value=:value"
                    element={<MovieSearchPage />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </SearchContextProvider>
  )
}

export default App
