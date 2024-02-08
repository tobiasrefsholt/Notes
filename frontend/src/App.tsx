import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/dashboard/dashboard';
import Logout from './pages/logout/logout';
import NoteSingle from './pages/dashboard/singleNote/noteSingle';
import NoteDetailedList from './pages/dashboard/noteDetailedList/noteDetailedList';
import './App.css';
import CategoryAdd from "./pages/dashboard/sidebar/categoryAdd";
import CategoryEdit from "./pages/dashboard/categoryEdit/categoryEdit";
import UserSettings from "./pages/dashboard/userSettings/userSettings";
import { useContext, useEffect } from "react";
import GlobalStateContext from "./context/globalStateContext";
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
          <Route index element={<NoteDetailedList />} />
          <Route path='note' element={<NoteSingle />} />
          <Route path='note/:guid' element={<NoteSingle />} />
          <Route path='add-category' element={<CategoryAdd />} />
          <Route path='edit-category' element={<CategoryEdit />} />
          <Route path="user-settings" element={<UserSettings />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}