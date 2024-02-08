import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import GlobalStateProvider from './context/globalStateProvider.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GlobalStateProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStateProvider>
)
