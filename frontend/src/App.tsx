import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import NoteAdd from './Components/Dashboard/NoteAdd';
import NoteSingle from './Components/Dashboard/NoteSingle';
import CategoryBrowser from './Components/Dashboard/CategoryBrowser';
import './App.css';
import CategoryAdd from "./Components/Dashboard/CategoryAdd";
import CategoryEdit from "./Components/Dashboard/CategoryEdit";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<CategoryBrowser />} />
          <Route path='note/:guid' element={<NoteSingle />} />
          <Route path='add-note' element={<NoteAdd />} />
          <Route path='add-category' element={<CategoryAdd />} />
          <Route path='edit-category' element={<CategoryEdit />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}