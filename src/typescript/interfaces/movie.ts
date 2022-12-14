import { Icredits } from './castAndCrew'

export interface Imovie {
  results: Imovie
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  genre_ids: number[]
  backdrop_path: string
  popularity: number
  vote_count: number
  vote_average: number
  runtime: number
  revenue: number
  budget: number
  credits: Icredits
  genres: { name: string; id: number }[]
  videos: Ivideos
  images: Iimages
  tagline: string
}

export interface Ivideos {
  results: Iresults[]
}
export interface Iresults {
  name: string
  key: string
}

export interface Iimages {
  backdrops: Iimage[]
}

export interface Iimage {
  file_path: string
}

export interface Poster {
  id: number
  title: string
  poster_path: string
}
