import axios from 'axios'

export const fetchMovies = async <T>(request: string): Promise<T | null> => {
  const response = await axios.get<T>(`https://api.themoviedb.org/3${request}`)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return response.data ?? null
}
