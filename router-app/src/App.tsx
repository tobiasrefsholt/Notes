import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Cookies from 'js-cookie';
import Login from './pages/Login'
import NotesDashbord from './pages/NotesDashboard'
import AddTask from './pages/AddTask'
import './App.css'
import Navigaton from './Components/Shared/Navigation';
import Logout from './pages/Logout';

export default function App() {
  /* function isLoggedIn() {
    return Cookies.get('token') != null;
  } */
 

  const [token, setToken] = useState(Cookies.get("token") || null);

  if (!token) return (<Login setToken={setToken} />);

  return (
    <>
      <Navigaton />
      <Routes>
        <Route path="/" element={<NotesDashbord />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}