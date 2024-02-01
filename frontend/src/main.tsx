import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import GlobalStateProvider from './context/GlobalStateProvider.tsx'

ReactDOM.createRoot(document.body).render(
    <GlobalStateProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStateProvider>
)
