import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

interface Context {
  searchFor: string
  setSearchFor: Dispatch<SetStateAction<string>>
}

interface ProviderProps {
  children: ReactNode
}

const SearchContext = createContext({} as Context)

export function useSearchContext() {
  return useContext(SearchContext)
}

export function SearchContextProvider({ children }: ProviderProps) {
  const [searchFor, setSearchFor] = useState('a')

  return (
    <SearchContext.Provider value={{ setSearchFor, searchFor }}>
      {children}
    </SearchContext.Provider>
  )
}
