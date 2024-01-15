import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import Cookies from 'js-cookie';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import './App.css'
import AddNote from './Components/Dashboard/AddNote';
import SingleNote from './Components/Dashboard/SingleNote';

export default function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard token={token} setToken={setToken} />}>
          <Route index element={<SingleNote />} />
          <Route path='add-note' element={<AddNote />} />
        </Route>
        <Route path='/logout' element={<Logout setToken={setToken} />}></Route>
      </Routes>
    </>
  )
}