import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import NoteSingle from './Components/Dashboard/NoteSingle';
import CategoryBrowser from './Components/Dashboard/CategoryBrowser';
import './App.css';
import CategoryAdd from "./Components/Dashboard/CategoryAdd";
import CategoryEdit from "./Components/Dashboard/CategoryEdit";
import UserSettings from "./Components/Dashboard/UserSettings";

export default function App() {
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