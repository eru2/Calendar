import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CalendarPage from './pages/CalendarPage'
import LoginPage from './pages/Login'
import UserEnroll from './pages/UserEnroll'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  return (
    <>
      <Routes>
       <Route path="/" element={<LoginPage />} /> 
       <Route path="/Enroll" element={<UserEnroll/>}/>
       <Route path='/calendar' element={<CalendarPage/>}/>
      </Routes>
    </>
  )
}

export default App;