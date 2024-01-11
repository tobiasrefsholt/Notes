import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Login from './pages/Login'
import MainTasks from './pages/MainTasks'
import AddTask from './pages/AddTask'
import './App.css'

function App() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Main Tasks</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/add-task">Add Task</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<MainTasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    </>
  )
}

export default App
