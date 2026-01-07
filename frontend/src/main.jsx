import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import { store } from './reduxstate/store.js'
import { Provider } from 'react-redux'
import {Toaster} from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster/>
      </Provider>,
    </BrowserRouter>
  </StrictMode>,
)
