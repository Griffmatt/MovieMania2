import '@smastrom/react-rating/style.css'
import './index.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { CombinedContextProvider } from './context/combinedContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const persistor = persistStore(store)
const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CombinedContextProvider>
              <App />
            </CombinedContextProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
