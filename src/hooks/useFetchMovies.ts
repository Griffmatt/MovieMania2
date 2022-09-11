import axios from 'axios'
import { useEffect, useState } from 'react'

export default function useFetchMovies<T>(request: string) {
  const [movies, setMovies] = useState<T>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    async function fetchMovies() {
      setLoading(true)
      try {
        const response = await axios.get<T>(
          `https://api.themoviedb.org/3${request}`
        )
        setMovies(response.data.results ?? response.data)
        setLoading(false)
        return response
      } catch {
        console.log('error')
      }
    }
    void fetchMovies()
    return () => {
      source.cancel()
    }
  }, [request])
  return { movies, loading }
}
