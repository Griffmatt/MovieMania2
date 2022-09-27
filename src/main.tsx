import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { CombinedContextProvider } from './context/combinedContext'

const persistor = persistStore(store)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CombinedContextProvider>
            <App />
          </CombinedContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
