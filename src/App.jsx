import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CalendarPage from './pages/CalendarPage'
import LoginPage from './pages/Login'
import UserEnroll from './pages/UserEnroll'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddSchedule from './pages/AddSchedule'
import NotFound from './pages/NotFound'
import UpdateSchedule from  './pages/UpdateSchedule'
import UserInfo from './pages/UserInfo'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { performToast } from './utils/performToast';


performToast({ msg: '요청에 성공하였습니다.1', type: 'success' });

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);

  
  return (
    
    <>
      <Routes>
       <Route path="/" element={<LoginPage />} /> 
       <Route path="/Enroll" element={<UserEnroll/>}/>
       <Route path='/calendar' element={<CalendarPage/>}/>
       <Route path="*" element={<NotFound />} />
       <Route path='/add' element={<AddSchedule />} /> 
       <Route path="/edit/:eventId" element={<UpdateSchedule />} />     
       <Route path="/user" element={<UserInfo />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App;