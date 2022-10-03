import '@smastrom/react-rating/style.css'
import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { CombinedContextProvider } from './context/combinedContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CombinedContextProvider>
          <App />
        </CombinedContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
