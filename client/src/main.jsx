import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from "./context/userContext.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
