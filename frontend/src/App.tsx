import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import NoteSingle from './Components/Dashboard/NoteSingle';
import CategoryBrowser from './Components/Dashboard/CategoryBrowser';
import './App.css';
import CategoryAdd from "./Components/Dashboard/CategoryAdd";
import CategoryEdit from "./Components/Dashboard/CategoryEdit";
import UserSettings from "./Components/Dashboard/UserSettings";
import { useContext, useEffect } from "react";
import GlobalStateContext from "./context/GlobalStateContext";
import useBearerToken from "./hooks/useBearerToken";

export default function App() {
  const { globalState, setGlobalState } = useContext(GlobalStateContext)!;
  useEffect(() => {
    useBearerToken()
      .then((token) => {
        if (token !== null)
          setGlobalState({ ...globalState, isLoggedIn: true })
      })
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<CategoryBrowser />} />
          <Route path='note/:guid' element={<NoteSingle />} />
          <Route path='add-category' element={<CategoryAdd />} />
          <Route path='edit-category' element={<CategoryEdit />} />
          <Route path="/user-settings" element={<UserSettings />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}