import { Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import AddNote from './Components/Dashboard/AddNote';
import SingleNote from './Components/Dashboard/SingleNote';
import Default from './Components/Dashboard/Default';
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<Default />} />
          <Route path='note/:guid' element={<SingleNote />} />
          <Route path='add-note' element={<AddNote />} />
        </Route>
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </>
  )
}